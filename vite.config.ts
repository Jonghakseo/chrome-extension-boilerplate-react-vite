import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import copyTemplate from "./plugins/copy-template";
import makeManifest from "./plugins/make-manifest";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

const customPlugins: PluginOption[] = [copyTemplate(), makeManifest()];

export default defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir,
    },
  },
  plugins: [
    react(),
    ...customPlugins,
    createHtmlPlugin({
      pages: [
        {
          entry: resolve(pagesDir, "Newtab", "index.tsx"),
          filename: "newtab.js",
          template: "public/newtab.html",
        },
        {
          entry: resolve(pagesDir, "Options", "index.tsx"),
          filename: "options.js",
          template: "public/options.html",
        },
        {
          entry: resolve(pagesDir, "Panel", "index.tsx"),
          filename: "panel.js",
          template: "public/panel.html",
        },
        {
          entry: resolve(pagesDir, "Popup", "index.tsx"),
          filename: "popup.js",
          template: "public/popup.html",
        },
        {
          entry: resolve(pagesDir, "Devtools", "index.ts"),
          filename: "devtools.js",
          template: "public/devtools.html",
        },
      ],
    }),
  ],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        // css
        contentStyle: resolve(pagesDir, "Content", "content.style.css"),
        // ts
        content: resolve(pagesDir, "Content", "index.ts"),
        background: resolve(pagesDir, "Background", "index.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "contentStyle") {
            return `content.styles.css`;
          }
          return `${chunk.name}.js`;
        },
      },
      external: ["chrome"],
    },
  },
});
