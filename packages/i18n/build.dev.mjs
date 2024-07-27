import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";

const i18nPath = path.resolve("lib", "i18n_dev.ts");
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
