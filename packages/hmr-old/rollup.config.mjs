import sucrase from "@rollup/plugin-sucrase";

const plugins = [
  sucrase({
    exclude: ["node_modules/**"],
    transforms: ["typescript"]
  }),
];

/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    plugins,
    input: "lib/initReloadServer.ts",
    output: {
      file: "build/initReloadServer.js"
    },
    external: ["ws", "chokidar"]
  },
  {
    plugins,
    input: "lib/injections/script.ts",
    output: {
      file: "build/injections/script.js"
    }
  },
  {
    plugins,
    input: "lib/injections/view.ts",
    output: {
      file: "build/injections/view.js"
    }
  }
];
