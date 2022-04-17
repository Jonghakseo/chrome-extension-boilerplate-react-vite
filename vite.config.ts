import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import makeManifest from "./utils/plugins/make-manifest";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

export default defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir,
    },
  },
  plugins: [react(), makeManifest()],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        devtools: resolve(pagesDir, "devtools", "index.ts"),
        content: resolve(pagesDir, "content", "index.ts"),
        contentStyle: resolve(pagesDir, "content", "style.css"),
        background: resolve(pagesDir, "background", "index.ts"),
        popup: resolve(pagesDir, "popup", "index.html"),
        newtab: resolve(pagesDir, "newtab", "index.html"),
        options: resolve(pagesDir, "options", "index.html"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "contentStyle") {
            return `src/pages/content/style.css`;
          }
          return `src/pages/${chunk.name}/index.js`;
        },
      },
    },
  },
});
