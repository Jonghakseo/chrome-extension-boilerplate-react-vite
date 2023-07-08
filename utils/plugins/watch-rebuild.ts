import type { PluginOption } from "vite";
import { resolve } from "path";

const rootDir = resolve(__dirname, "..", "..");
const publicDir = resolve(rootDir, "public");
const manifestFile = resolve(rootDir, "manifest.ts");
const viteConfigFile = resolve(rootDir, "vite.config.ts");
const localeFolder = resolve(publicDir, "_locales");

export default function watchRebuild(): PluginOption {
  return {
    name: "watch-rebuild",
    async buildStart() {
      this.addWatchFile(manifestFile);
      this.addWatchFile(viteConfigFile);
      this.addWatchFile(localeFolder);
    },
  };
}
