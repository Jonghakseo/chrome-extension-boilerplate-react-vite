import * as path from "path";
import { PluginOption } from "vite";
import { readFileSync } from "fs";

const isDev = process.env.__DEV__ === "true";

const DUMMY_CODE = `export default function(){};`;

const checkDevMode = (readFile: () => string): string => {
  return isDev ? readFile() : DUMMY_CODE;
};

function getInjectionCode(fileName: string): string {
  return readFileSync(
    path.resolve(__dirname, "..", "reload", "injections", fileName),
    { encoding: "utf8" }
  );
}

type Config = {
  background?: boolean;
  view?: boolean;
};

export default function addHmr(config?: Config): PluginOption {
  const { background = false, view = true } = config || {};
  const idInBackgroundScript = "virtual:reload-on-update-in-background-script";
  const idInView = "virtual:reload-on-update-in-view";

  const scriptHmrCode = checkDevMode(() => getInjectionCode("script.js"));
  const viewHmrCode = checkDevMode(() => getInjectionCode("view.js"));

  return {
    name: "add-hmr",
    resolveId(id) {
      if (id === idInBackgroundScript) {
        return getResolvedId(idInBackgroundScript);
      }
      if (id === idInView) {
        return getResolvedId(idInView);
      }
    },
    load(id) {
      if (id === getResolvedId(idInBackgroundScript)) {
        return background ? scriptHmrCode : DUMMY_CODE;
      }

      if (id === getResolvedId(idInView)) {
        return view ? viewHmrCode : DUMMY_CODE;
      }
    },
  };
}

function getResolvedId(id: string) {
  return "\0" + id;
}
