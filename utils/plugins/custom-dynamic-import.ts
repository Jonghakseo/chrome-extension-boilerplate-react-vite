import { PluginOption } from "vite";

export default function customDynamicImport(): PluginOption {
  return {
    name: "custom-dynamic-import",
    renderDynamicImport() {
      return {
        left: `() => import(
          `,
        right: ")",
      };
    },
  };
}
