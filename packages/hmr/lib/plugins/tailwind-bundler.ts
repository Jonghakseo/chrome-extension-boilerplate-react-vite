import { Plugin } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

export function processCssPlugin(): Plugin {
    return {
      name: 'process-css',
      async configResolved(config) {
        const inputFile = path.resolve(__dirname, '../../../../ui/lib/global.css');
        const outputFile = path.resolve(__dirname, '../../../../ui/dist/global-out.css');
  
        const css = await fs.readFile(inputFile, 'utf-8');
        const result = await postcss([
          postcssImport(),
          tailwindcss,
          autoprefixer,
        ]).process(css, { from: inputFile, to: outputFile });
        await fs.mkdir(path.dirname(outputFile), { recursive: true });

        await fs.writeFile(outputFile, result.css);
        console.log('CSS processed and saved to', outputFile);
      }
    };
}