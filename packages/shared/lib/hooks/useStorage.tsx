import { useSyncExternalStore } from 'react';
import { type BaseStorage } from '@chrome-extension-boilerplate/storage';

type WrappedPromise = ReturnType<typeof wrapPromise>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storageMap: Map<BaseStorage<any>, WrappedPromise> = new Map();

export function useStorageSuspense<
  Storage extends BaseStorage<Data>,
  Data = Storage extends BaseStorage<infer Data> ? Data : unknown,
>(storage: Storage) {
  const _data = useSyncExternalStore<Data | null>(storage.subscribe, storage.getSnapshot);

  if (!storageMap.has(storage)) {
    storageMap.set(storage, wrapPromise(storage.get()));
  }
  if (_data !== null) {
    storageMap.set(storage, { read: () => _data });
  }

  return _data ?? (storageMap.get(storage)!.read() as Data);
}

function wrapPromise<R>(promise: Promise<R>) {
  let status = 'pending';
  let result: R;
  const suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    },
  );

  return {
    read() {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw result;
        default:
          return result;
      }
    },
  };
}

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
