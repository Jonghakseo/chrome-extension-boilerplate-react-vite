import * as fs from "fs";
import * as path from "path";
import colorLog from "./utils/color-log";

const { resolve } = path;

const outDir = resolve(__dirname, "..", "dist");
const rootDir = resolve(__dirname, "..", "src");

export default function copyManifest() {
  return {
    name: "copy-manifest",
    buildEnd() {
      const from = resolve(rootDir, "manifest.json");
      const to = resolve(outDir, "manifest.json");

      fs.copyFileSync(from, to);
      colorLog(`Manifest file copy complete: ${to}`, "success");
    },
  };
}
