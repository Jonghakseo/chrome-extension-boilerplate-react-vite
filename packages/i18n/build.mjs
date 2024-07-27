import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { rimraf } from "rimraf";

const i18nPath = path.resolve("lib", "i18n-prod.ts");
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

const outDir = path.resolve("..", "..", "dist");
const localePath = path.resolve(outDir, "_locales");
rimraf.sync(localePath);
fs.cpSync(path.resolve("locales"), localePath, { recursive: true });

