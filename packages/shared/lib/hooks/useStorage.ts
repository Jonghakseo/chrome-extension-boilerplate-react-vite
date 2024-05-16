import { BaseStorage } from '../storages';
import { useSyncExternalStore } from 'react';

export function useStorage<
  Storage extends BaseStorage<Data>,
  Data = Storage extends BaseStorage<infer Data> ? Data : unknown,
>(storage: Storage) {
  const _data = useSyncExternalStore<Data | null>(storage.subscribe, storage.getSnapshot);

  // eslint-disable-next-line
  // @ts-ignore
  if (!storageMap.has(storage)) {
    // eslint-disable-next-line
    // @ts-ignore
    storageMap.set(storage, wrapPromise(storage.get()));
  }
  if (_data !== null) {
    // eslint-disable-next-line
    // @ts-ignore
    storageMap.set(storage, { read: () => _data });
  }
  // eslint-disable-next-line
  // @ts-ignore
  return _data ?? (storageMap.get(storage)!.read() as Data);
}
