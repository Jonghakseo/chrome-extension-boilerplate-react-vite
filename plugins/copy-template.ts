import * as fs from "fs";
import * as path from "path";
import colorLog from "./utils/color-log";
import checkCalled from "./utils/check-called";

const { resolve } = path;

const publicDir = resolve(__dirname, "../public");
const pagesDir = resolve(__dirname, "../src/pages");

const folders = ["Newtab", "Panel", "Devtools", "Options", "Popup"];

export default function copyTemplate() {
  const checker = checkCalled();
  return {
    name: "copy-template",
    buildStart() {
      if (checker.isCalled()) {
        return;
      }

      folders.forEach((folder) => {
        const from = resolve(pagesDir, folder, "index.html");
        const to = resolve(publicDir, `${folder.toLowerCase()}.html`);

        fs.copyFileSync(from, to);
        colorLog(`Template file copy complete: ${to}`, "success");
      });

      checker.call();
    },
  };
}
