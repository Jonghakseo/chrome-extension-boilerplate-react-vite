import { useSyncExternalStore } from "react";
import { BaseStorage } from "@src/shared/storages/base";

export default function useStorage<
  Storage extends BaseStorage<Data>,
  Data = Storage extends BaseStorage<infer Data> ? Data : unknown,
>(storage: Storage) {
  return useSyncExternalStore<Data>(storage.subscribe, storage.getSnapshot);
}
