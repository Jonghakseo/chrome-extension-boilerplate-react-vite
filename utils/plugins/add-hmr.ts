import * as path from "path";
import { PluginOption } from "vite";
import { readFileSync } from "fs";

const scriptHmrCode = readFileSync(
  path.resolve(__dirname, "..", "reload", "injections", "script.js"),
  {
    encoding: "utf8",
  }
);
const viewHmrCode = readFileSync(
  path.resolve(__dirname, "..", "reload", "injections", "view.js"),
  {
    encoding: "utf8",
  }
);

const dummyCode = `export default function(){};`;

type Config = {
  background?: boolean;
  view?: boolean;
};

export default function addHmr(config?: Config): PluginOption {
  const { background = false, view = true } = config || {};
  const idInBackgroundScript = "virtual:reload-on-update-in-background-script";
  const idInView = "virtual:reload-on-update-in-view";

  return {
    name: "add-hmr",
    resolveId(id) {
      switch (id) {
        case idInBackgroundScript:
          return getResolvedId(idInBackgroundScript);
        case idInView:
          return getResolvedId(idInView);
      }
    },
    load(id) {
      if (id === getResolvedId(idInBackgroundScript)) {
        return background ? scriptHmrCode : dummyCode;
      }

      if (id === getResolvedId(idInView)) {
        return view ? viewHmrCode : dummyCode;
      }
    },
  };
}

function getResolvedId(id: string) {
  return "\0" + id;
}
