import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type Theme = 'light' | 'dark';

type ThemeStorage = BaseStorage<Theme> & {
  toggle: () => void;
};

const storage = createStorage<Theme>('theme-storage-key', 'light', {
  storageType: StorageType.Local,
});

const exampleThemeStorage: ThemeStorage = {
  ...storage,
  // TODO: extends your own methods
  toggle: () => {
    storage.set(currentTheme => {
      return currentTheme === 'light' ? 'dark' : 'light';
    });
  },
};

export default exampleThemeStorage;
