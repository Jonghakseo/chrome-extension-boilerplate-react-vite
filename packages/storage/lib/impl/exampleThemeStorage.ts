import { createStorage, StorageEnum } from '../base/index.js';
import type { ThemeState, ThemeStorage } from '../types.js';

const storage = createStorage<ThemeState>(
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

export const exampleThemeStorage: ThemeStorage = {
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
