import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { rimraf } from "rimraf";

const isDev = process.env.__DEV__ === "true";
const i18nFileName = isDev ? "i18n_dev.ts" : "i18n_prod.ts";
const i18nPath = path.resolve("lib", i18nFileName);
fs.cpSync(i18nPath, path.resolve("lib", "i18n.ts"));

/**
 * @type { import("esbuild").BuildOptions }
 */
const buildOptions = {
  entryPoints: ["./index.ts"],
  tsconfig: "./tsconfig.json",
  bundle: true,
  packages: "bundle",
  target: "es6",
  outdir: "./dist",
  sourcemap: true,
  format: "esm",
};
await esbuild.build(buildOptions);

if (!isDev) {
  await esbuild.build(buildOptions);
  const outDir = path.resolve("..", "..", "dist");
  const localePath = path.resolve(outDir, "_locales");
  rimraf.sync(localePath);
  fs.cpSync(path.resolve("locales"), localePath, { recursive: true });
}

