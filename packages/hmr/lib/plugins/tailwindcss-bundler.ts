import { Plugin } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import LightningCSS from 'lightningcss';

const rootDir = path.resolve(__dirname, '../../../../');

export function processCssPlugin(): Plugin {
  return {
    name: 'process-css',
    async configResolved(config) {
      const inputFile = path.resolve(rootDir, 'ui/lib/global.css');
      const outputFile = path.resolve(config.root, 'dist/global-out.css');

      const css = await fs.readFile(inputFile, 'utf-8');
      const result = await postcss([postcssImport(), tailwindcss, autoprefixer]).process(css, {
        from: inputFile,
        to: outputFile,
      });

      const minified = LightningCSS.transform({
        code: Buffer.from(result.css, 'utf8'),
        minify: true,
        targets: {
          // Define your target browsers or leave empty for default
        },
        filename: 'global.css',
      });

      const finalCss = Buffer.from(minified.code).toString('utf8');

      await fs.mkdir(path.dirname(outputFile), { recursive: true });
      await fs.writeFile(outputFile, finalCss);

      console.log('CSS processed and saved to', outputFile);
    },
  };
}
