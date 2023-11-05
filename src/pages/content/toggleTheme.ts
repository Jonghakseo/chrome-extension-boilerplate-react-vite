import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';

async function toggleTheme() {
  console.log('initial theme', await exampleThemeStorage.get());
  exampleThemeStorage.toggle();
  console.log('toggled theme', await exampleThemeStorage.get());
}

void toggleTheme();
