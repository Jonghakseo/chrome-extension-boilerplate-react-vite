import type { BaseStorage, StorageConfig, ValueOrUpdate } from './types';
import { SessionAccessLevelEnum, StorageEnum } from './enums';

/**
 * Chrome reference error while running `processTailwindFeatures` in tailwindcss.
 *  To avoid this, we need to check if the globalThis.chrome is available and add fallback logic.
 */
const chrome = globalThis.chrome;

/**
 * Sets or updates an arbitrary cache with a new value or the result of an update function.
 */
async function updateCache<D>(valueOrUpdate: ValueOrUpdate<D>, cache: D | null): Promise<D> {
  // Type guard to check if our value or update is a function
  function isFunction<D>(value: ValueOrUpdate<D>): value is (prev: D) => D | Promise<D> {
    return typeof value === 'function';
  }

  // Type guard to check in case of a function, if its a Promise
  function returnsPromise<D>(func: (prev: D) => D | Promise<D>): func is (prev: D) => Promise<D> {
    // Use ReturnType to infer the return type of the function and check if it's a Promise
    return (func as (prev: D) => Promise<D>) instanceof Promise;
  }

  if (isFunction(valueOrUpdate)) {
    // Check if the function returns a Promise
    if (returnsPromise(valueOrUpdate)) {
      return valueOrUpdate(cache as D);
    } else {
      return valueOrUpdate(cache as D);
    }
  } else {
    return valueOrUpdate;
  }
}

/**
 * If one session storage needs access from content scripts, we need to enable it globally.
 * @default false
 */
let globalSessionAccessLevelFlag: StorageConfig['sessionAccessForContentScripts'] = false;

/**
 * Checks if the storage permission is granted in the manifest.json.
 */
function checkStoragePermission(storageEnum: StorageEnum): void {
  if (!chrome) {
    return;
  }

  if (chrome.storage[storageEnum] === undefined) {
    throw new Error(`Check your storage permission in manifest.json: ${storageEnum} is not defined`);
  }
}

/**
 * Creates a storage area for persisting and exchanging data.
 */
export function createStorage<D = string>(key: string, fallback: D, config?: StorageConfig<D>): BaseStorage<D> {
  let cache: D | null = null;
  let listeners: Array<() => void> = [];

  const storageEnum = config?.storageEnum ?? StorageEnum.Local;
  const liveUpdate = config?.liveUpdate ?? false;

  const serialize = config?.serialization?.serialize ?? ((v: D) => v);
  const deserialize = config?.serialization?.deserialize ?? (v => v as D);

  // Set global session storage access level for StoryType.Session, only when not already done but needed.
  if (
    globalSessionAccessLevelFlag === false &&
    storageEnum === StorageEnum.Session &&
    config?.sessionAccessForContentScripts === true
  ) {
    checkStoragePermission(storageEnum);
    chrome?.storage[storageEnum]
      .setAccessLevel({
        accessLevel: SessionAccessLevelEnum.ExtensionPagesAndContentScripts,
      })
      .catch(error => {
        console.warn(error);
        console.warn('Please call setAccessLevel into different context, like a background script.');
      });
    globalSessionAccessLevelFlag = true;
  }

  // Register life cycle methods
  const get = async (): Promise<D> => {
    checkStoragePermission(storageEnum);
    const value = await chrome?.storage[storageEnum].get([key]);

    if (!value) {
      return fallback;
    }

    return deserialize(value[key]) ?? fallback;
  };

  const _emitChange = () => {
    listeners.forEach(listener => listener());
  };

  const set = async (valueOrUpdate: ValueOrUpdate<D>) => {
    cache = await updateCache(valueOrUpdate, cache);

    await chrome?.storage[storageEnum].set({ [key]: serialize(cache) });
    _emitChange();
  };

  const subscribe = (listener: () => void) => {
    listeners = [...listeners, listener];

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const getSnapshot = () => {
    return cache;
  };

  get().then(data => {
    cache = data;
    _emitChange();
  });

  // Listener for live updates from the browser
  async function _updateFromStorageOnChanged(changes: { [key: string]: chrome.storage.StorageChange }) {
    // Check if the key we are listening for is in the changes object
    if (changes[key] === undefined) return;

    const valueOrUpdate: ValueOrUpdate<D> = deserialize(changes[key].newValue);

    if (cache === valueOrUpdate) return;

    cache = await updateCache(valueOrUpdate, cache);

    _emitChange();
  }

  // Register listener for live updates for our storage area
  if (liveUpdate) {
    chrome?.storage[storageEnum].onChanged.addListener(_updateFromStorageOnChanged);
  }

  return {
    get,
    set,
    getSnapshot,
    subscribe,
  };
}
