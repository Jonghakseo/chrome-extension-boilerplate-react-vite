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
    input: "lib/injections/script.ts",
    output: {
      format: "iife",
      file: "dist/injections/script.js"
    }
  },
  {
    plugins,
    input: "lib/injections/view.ts",
    output: {
      format: "iife",
      file: "dist/injections/view.js"
    }
  }
];
