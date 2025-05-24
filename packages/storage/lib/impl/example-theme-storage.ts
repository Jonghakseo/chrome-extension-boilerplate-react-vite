import { createStorage, StorageEnum } from '../base/index.js';
import type { ThemeStateType, ThemeStorageType } from '../base/index.js';

const storage = createStorage<ThemeStateType>(
  'theme-storage-key',
  {
    theme: 'light',
    isLight: true,
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

export const exampleThemeStorage: ThemeStorageType = {
  ...storage,
  toggle: async () => {
    await storage.set(currentState => {
      const newTheme = currentState.theme === 'light' ? 'dark' : 'light';

      return {
        theme: newTheme,
        isLight: newTheme === 'light',
      };
    });
  },
};
