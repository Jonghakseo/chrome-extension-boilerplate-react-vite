import { createStorage, StorageEnum } from '../base/index.js';
import type { BaseStorage } from '../base/index.js';

interface ThemeState {
  theme: 'light' | 'dark';
  isLight: boolean;
}

type ThemeStorage = BaseStorage<ThemeState> & {
  toggle: () => Promise<void>;
};

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
