import * as fs from "fs";
import * as path from "path";
import colorLog from "../log";
import { PluginOption } from "vite";
import ManifestParser from "../manifest-parser";

const { resolve } = path;

const outDir = resolve(__dirname, "..", "..", "public");

export default function makeManifest(
  manifest: chrome.runtime.ManifestV3
): PluginOption {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }

      const manifestPath = resolve(outDir, "manifest.json");

      fs.writeFileSync(
        manifestPath,
        ManifestParser.convertManifestToString(manifest)
      );

      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    },
  };
}
