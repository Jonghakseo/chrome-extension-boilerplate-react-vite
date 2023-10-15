export enum StorageType {
  Local = 'local',
  Sync = 'sync',
  Managed = 'managed',
  Session = 'session',
}

type ValueOrUpdate<D> = D | ((prev: D) => Promise<D> | D);

export type BaseStorage<D> = {
  get: () => Promise<D>;
  set: (value: ValueOrUpdate<D>) => Promise<void>;
  getSnapshot: () => D | null;
  subscribe: (listener: () => void) => () => void;
};

export function createStorage<D>(key: string, fallback: D, config?: { storageType?: StorageType }): BaseStorage<D> {
  let cache: D | null = null;
  let listeners: Array<() => void> = [];
  const storageType = config?.storageType ?? StorageType.Local;

  const _getDataFromStorage = async (): Promise<D> => {
    if (chrome.storage[storageType] === undefined) {
      throw new Error(`Check your storage permission into manifest.json: ${storageType} is not defined`);
    }
    const value = await chrome.storage[storageType].get([key]);
    return value[key] ?? fallback;
  };

  const _emitChange = () => {
    listeners.forEach(listener => listener());
  };

  const set = async (valueOrUpdate: ValueOrUpdate<D>) => {
    if (typeof valueOrUpdate === 'function') {
      // eslint-disable-next-line no-prototype-builtins
      if (valueOrUpdate.hasOwnProperty('then')) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cache = await valueOrUpdate(cache);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cache = valueOrUpdate(cache);
      }
    } else {
      cache = valueOrUpdate;
    }
    await chrome.storage[storageType].set({ [key]: cache });
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

  _getDataFromStorage().then(data => {
    cache = data;
    _emitChange();
  });

  return {
    get: _getDataFromStorage,
    set,
    getSnapshot,
    subscribe,
  };
}
