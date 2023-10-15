import { defineConfig } from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import presetAutoprefix from '@twind/preset-autoprefix';

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
});
