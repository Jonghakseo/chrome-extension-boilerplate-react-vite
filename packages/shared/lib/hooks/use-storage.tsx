import { useRef, useSyncExternalStore } from 'react';
import type { BaseStorageType } from '@extension/storage';

type WrappedPromise = ReturnType<typeof wrapPromise>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storageMap: Map<BaseStorageType<any>, WrappedPromise> = new Map();

const wrapPromise = <R,>(promise: Promise<R>) => {
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
};

export const useStorage = <
  Storage extends BaseStorageType<Data>,
  Data = Storage extends BaseStorageType<infer Data> ? Data : unknown,
>(
  storage: Storage,
) => {
  const initializedRef = useRef(false);
  const _data = useSyncExternalStore<Data | null>(storage.subscribe, storage.getSnapshot);

  if (!storageMap.has(storage)) {
    storageMap.set(storage, wrapPromise(storage.get()));
  }

  if (_data || initializedRef.current) {
    storageMap.set(storage, { read: () => _data });
    initializedRef.current = true;
  }

  return (_data ?? storageMap.get(storage)!.read()) as Exclude<Data, PromiseLike<unknown>>;
};
