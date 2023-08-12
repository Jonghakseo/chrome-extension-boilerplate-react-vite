export enum StorageType {
  Local = "local",
  Sync = "sync",
  Managed = "managed",
  Session = "session",
}

export type BaseStorage<D> = {
  set: (value: D) => void;
  getSnapshot: () => D;
  subscribe: (listener: () => void) => () => void;
};

export function createStorage<D>(
  key: string,
  initial: D,
  config?: { storageType?: StorageType }
): BaseStorage<D> {
  let cache: D = initial;
  let listeners: Array<() => void> = [];
  const storageType = config?.storageType ?? StorageType.Local;

  const _getDataFromStorage = async (): Promise<D> => {
    if (chrome.storage[storageType] === undefined) {
      throw new Error(
        `Check your storage permission into manifest.json: ${storageType} is not defined`
      );
    }
    const value = await chrome.storage[storageType].get([key]);
    return value[key];
  };

  const _emitChange = () => {
    listeners.forEach((listener) => listener());
  };

  const set = (value: D) => {
    cache = value;
    chrome.storage[storageType].set({ [key]: value }, () => {
      _emitChange();
    });
  };

  const subscribe = (listener: () => void) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const getSnapshot = () => {
    return cache;
  };

  const init = async () => {
    try {
      const data = await _getDataFromStorage();
      if (data && cache !== data) {
        _emitChange();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  void init();

  return {
    set,
    getSnapshot,
    subscribe,
  };
}
