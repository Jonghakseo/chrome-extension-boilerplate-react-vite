import * as fs from "fs";
import * as path from "path";
import colorLog from "./utils/color-log";
import manifest from "../src/manifest";

const { resolve } = path;

const outDir = resolve(__dirname, "..", "dist");

export default function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }

      const manifestPath = resolve(outDir, "manifest.json");

      fs.writeFileSync(manifestPath, JSON.stringify(manifest));

      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    },
  };
}
