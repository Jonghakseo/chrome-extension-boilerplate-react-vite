// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve as resolve3 } from "path";
import { createHtmlPlugin } from "vite-plugin-html";

// plugins/copy-template.ts
import * as fs from "fs";
import * as path from "path";

// plugins/utils/color-log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// plugins/utils/check-called.ts
function checkCalled() {
  let _isCalled = false;
  return {
    isCalled() {
      return _isCalled;
    },
    call() {
      _isCalled = true;
    }
  };
}

// plugins/copy-template.ts
var { resolve } = path;
var publicDir = resolve("/Users/unqocn/chrome-extension-boilerplate/plugins", "../public");
var pagesDir = resolve("/Users/unqocn/chrome-extension-boilerplate/plugins", "../src/pages");
var folders = ["Newtab", "Panel", "Devtools", "Options", "Popup"];
function copyTemplate() {
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
    }
  };
}

// plugins/make-manifest.ts
import * as fs2 from "fs";
import * as path2 from "path";

// src/manifest.ts
import packageJson from "package.json";
var manifest = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  options_page: "options.html",
  background: { service_worker: "background.js" },
  action: {
    default_popup: "popup.html",
    default_icon: "icon-34.png"
  },
  chrome_url_overrides: {
    newtab: "newtab.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["content.js"],
      css: ["content.styles.css"]
    }
  ],
  devtools_page: "devtools.html",
  web_accessible_resources: [
    {
      resources: ["content.styles.css", "icon-128.png", "icon-34.png"],
      matches: []
    }
  ]
};
var manifest_default = manifest;

// plugins/make-manifest.ts
var { resolve: resolve2 } = path2;
var outDir = resolve2("/Users/unqocn/chrome-extension-boilerplate/plugins", "..", "dist");
function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      const manifestPath = resolve2(outDir, "manifest.json");
      fs2.writeFileSync(manifestPath, JSON.stringify(manifest_default));
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// vite.config.ts
var root = resolve3("/Users/unqocn/chrome-extension-boilerplate", "src");
var pagesDir2 = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir2 = resolve3("/Users/unqocn/chrome-extension-boilerplate", "dist");
var publicDir2 = resolve3("/Users/unqocn/chrome-extension-boilerplate", "public");
var customPlugins = [copyTemplate(), makeManifest()];
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir2
    }
  },
  plugins: [
    react(),
    ...customPlugins,
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: resolve3(pagesDir2, "Newtab", "index.tsx"),
          filename: "newtab.js",
          template: "public/newtab.html"
        },
        {
          entry: resolve3(pagesDir2, "Options", "index.tsx"),
          filename: "options.js",
          template: "public/options.html"
        },
        {
          entry: resolve3(pagesDir2, "Panel", "index.tsx"),
          filename: "panel.js",
          template: "public/panel.html"
        },
        {
          entry: resolve3(pagesDir2, "Popup", "index.tsx"),
          filename: "popup.js",
          template: "public/popup.html"
        },
        {
          entry: resolve3(pagesDir2, "Devtools", "index.ts"),
          filename: "devtools.js",
          template: "public/devtools.html"
        }
      ]
    })
  ],
  publicDir: publicDir2,
  build: {
    outDir: outDir2,
    watch: {
      include: "src"
    },
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ContentStyle: resolve3(pagesDir2, "Content", "content.style.css"),
        Content: resolve3(pagesDir2, "Content", "index.ts"),
        Background: resolve3(pagesDir2, "Background", "index.ts")
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "ContentStyle") {
            return `content.styles.css`;
          }
          return `${chunk.name}.js`;
        }
      },
      external: ["chrome"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGx1Z2lucy9jb3B5LXRlbXBsYXRlLnRzIiwgInBsdWdpbnMvdXRpbHMvY29sb3ItbG9nLnRzIiwgInBsdWdpbnMvdXRpbHMvY2hlY2stY2FsbGVkLnRzIiwgInBsdWdpbnMvbWFrZS1tYW5pZmVzdC50cyIsICJzcmMvbWFuaWZlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZywgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7XG5pbXBvcnQgY29weVRlbXBsYXRlIGZyb20gXCIuL3BsdWdpbnMvY29weS10ZW1wbGF0ZVwiO1xuaW1wb3J0IG1ha2VNYW5pZmVzdCBmcm9tIFwiLi9wbHVnaW5zL21ha2UtbWFuaWZlc3RcIjtcblxuY29uc3Qgcm9vdCA9IHJlc29sdmUoXCIvVXNlcnMvdW5xb2NuL2Nocm9tZS1leHRlbnNpb24tYm9pbGVycGxhdGVcIiwgXCJzcmNcIik7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgXCJwYWdlc1wiKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKFwiL1VzZXJzL3VucW9jbi9jaHJvbWUtZXh0ZW5zaW9uLWJvaWxlcnBsYXRlXCIsIFwiZGlzdFwiKTtcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoXCIvVXNlcnMvdW5xb2NuL2Nocm9tZS1leHRlbnNpb24tYm9pbGVycGxhdGVcIiwgXCJwdWJsaWNcIik7XG5cbmNvbnN0IGN1c3RvbVBsdWdpbnM6IFBsdWdpbk9wdGlvbltdID0gW2NvcHlUZW1wbGF0ZSgpLCBtYWtlTWFuaWZlc3QoKV07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAc3JjXCI6IHJvb3QsXG4gICAgICBcIkBhc3NldHNcIjogYXNzZXRzRGlyLFxuICAgICAgXCJAcGFnZXNcIjogcGFnZXNEaXIsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgLi4uY3VzdG9tUGx1Z2lucyxcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBlbnRyeTogcmVzb2x2ZShwYWdlc0RpciwgXCJOZXd0YWJcIiwgXCJpbmRleC50c3hcIiksXG4gICAgICAgICAgZmlsZW5hbWU6IFwibmV3dGFiLmpzXCIsXG4gICAgICAgICAgdGVtcGxhdGU6IFwicHVibGljL25ld3RhYi5odG1sXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBlbnRyeTogcmVzb2x2ZShwYWdlc0RpciwgXCJPcHRpb25zXCIsIFwiaW5kZXgudHN4XCIpLFxuICAgICAgICAgIGZpbGVuYW1lOiBcIm9wdGlvbnMuanNcIixcbiAgICAgICAgICB0ZW1wbGF0ZTogXCJwdWJsaWMvb3B0aW9ucy5odG1sXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBlbnRyeTogcmVzb2x2ZShwYWdlc0RpciwgXCJQYW5lbFwiLCBcImluZGV4LnRzeFwiKSxcbiAgICAgICAgICBmaWxlbmFtZTogXCJwYW5lbC5qc1wiLFxuICAgICAgICAgIHRlbXBsYXRlOiBcInB1YmxpYy9wYW5lbC5odG1sXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBlbnRyeTogcmVzb2x2ZShwYWdlc0RpciwgXCJQb3B1cFwiLCBcImluZGV4LnRzeFwiKSxcbiAgICAgICAgICBmaWxlbmFtZTogXCJwb3B1cC5qc1wiLFxuICAgICAgICAgIHRlbXBsYXRlOiBcInB1YmxpYy9wb3B1cC5odG1sXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBlbnRyeTogcmVzb2x2ZShwYWdlc0RpciwgXCJEZXZ0b29sc1wiLCBcImluZGV4LnRzXCIpLFxuICAgICAgICAgIGZpbGVuYW1lOiBcImRldnRvb2xzLmpzXCIsXG4gICAgICAgICAgdGVtcGxhdGU6IFwicHVibGljL2RldnRvb2xzLmh0bWxcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG4gIHB1YmxpY0RpcixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXIsXG4gICAgd2F0Y2g6IHtcbiAgICAgIGluY2x1ZGU6IFwic3JjXCIsXG4gICAgfSxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICAvLyBjc3NcbiAgICAgICAgQ29udGVudFN0eWxlOiByZXNvbHZlKHBhZ2VzRGlyLCBcIkNvbnRlbnRcIiwgXCJjb250ZW50LnN0eWxlLmNzc1wiKSxcbiAgICAgICAgLy8gdHNcbiAgICAgICAgQ29udGVudDogcmVzb2x2ZShwYWdlc0RpciwgXCJDb250ZW50XCIsIFwiaW5kZXgudHNcIiksXG4gICAgICAgIEJhY2tncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsIFwiQmFja2dyb3VuZFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogKGNodW5rKSA9PiB7XG4gICAgICAgICAgaWYgKGNodW5rLm5hbWUgPT09IFwiQ29udGVudFN0eWxlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBgY29udGVudC5zdHlsZXMuY3NzYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGAke2NodW5rLm5hbWV9LmpzYDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBleHRlcm5hbDogW1wiY2hyb21lXCJdLFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBjb2xvckxvZyBmcm9tIFwiLi91dGlscy9jb2xvci1sb2dcIjtcbmltcG9ydCBjaGVja0NhbGxlZCBmcm9tIFwiLi91dGlscy9jaGVjay1jYWxsZWRcIjtcblxuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoO1xuXG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKFwiL1VzZXJzL3VucW9jbi9jaHJvbWUtZXh0ZW5zaW9uLWJvaWxlcnBsYXRlL3BsdWdpbnNcIiwgXCIuLi9wdWJsaWNcIik7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUoXCIvVXNlcnMvdW5xb2NuL2Nocm9tZS1leHRlbnNpb24tYm9pbGVycGxhdGUvcGx1Z2luc1wiLCBcIi4uL3NyYy9wYWdlc1wiKTtcblxuY29uc3QgZm9sZGVycyA9IFtcIk5ld3RhYlwiLCBcIlBhbmVsXCIsIFwiRGV2dG9vbHNcIiwgXCJPcHRpb25zXCIsIFwiUG9wdXBcIl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvcHlUZW1wbGF0ZSgpIHtcbiAgY29uc3QgY2hlY2tlciA9IGNoZWNrQ2FsbGVkKCk7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJjb3B5LXRlbXBsYXRlXCIsXG4gICAgYnVpbGRTdGFydCgpIHtcbiAgICAgIGlmIChjaGVja2VyLmlzQ2FsbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb2xkZXJzLmZvckVhY2goKGZvbGRlcikgPT4ge1xuICAgICAgICBjb25zdCBmcm9tID0gcmVzb2x2ZShwYWdlc0RpciwgZm9sZGVyLCBcImluZGV4Lmh0bWxcIik7XG4gICAgICAgIGNvbnN0IHRvID0gcmVzb2x2ZShwdWJsaWNEaXIsIGAke2ZvbGRlci50b0xvd2VyQ2FzZSgpfS5odG1sYCk7XG5cbiAgICAgICAgZnMuY29weUZpbGVTeW5jKGZyb20sIHRvKTtcbiAgICAgICAgY29sb3JMb2coYFRlbXBsYXRlIGZpbGUgY29weSBjb21wbGV0ZTogJHt0b31gLCBcInN1Y2Nlc3NcIik7XG4gICAgICB9KTtcblxuICAgICAgY2hlY2tlci5jYWxsKCk7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJ0eXBlIENvbG9yVHlwZSA9IFwic3VjY2Vzc1wiIHwgXCJpbmZvXCIgfCBcImVycm9yXCIgfCBcIndhcm5pbmdcIiB8IGtleW9mIHR5cGVvZiBDT0xPUlM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yTG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZT86IENvbG9yVHlwZSkge1xuICBsZXQgY29sb3I6IHN0cmluZyA9IHR5cGUgfHwgQ09MT1JTLkZnQmxhY2s7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcInN1Y2Nlc3NcIjpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnR3JlZW47XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiaW5mb1wiOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdCbHVlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImVycm9yXCI6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJ3YXJuaW5nXCI6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1llbGxvdztcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY29uc29sZS5sb2coY29sb3IsIG1lc3NhZ2UpO1xufVxuXG5jb25zdCBDT0xPUlMgPSB7XG4gIFJlc2V0OiBcIlxceDFiWzBtXCIsXG4gIEJyaWdodDogXCJcXHgxYlsxbVwiLFxuICBEaW06IFwiXFx4MWJbMm1cIixcbiAgVW5kZXJzY29yZTogXCJcXHgxYls0bVwiLFxuICBCbGluazogXCJcXHgxYls1bVwiLFxuICBSZXZlcnNlOiBcIlxceDFiWzdtXCIsXG4gIEhpZGRlbjogXCJcXHgxYls4bVwiLFxuICBGZ0JsYWNrOiBcIlxceDFiWzMwbVwiLFxuICBGZ1JlZDogXCJcXHgxYlszMW1cIixcbiAgRmdHcmVlbjogXCJcXHgxYlszMm1cIixcbiAgRmdZZWxsb3c6IFwiXFx4MWJbMzNtXCIsXG4gIEZnQmx1ZTogXCJcXHgxYlszNG1cIixcbiAgRmdNYWdlbnRhOiBcIlxceDFiWzM1bVwiLFxuICBGZ0N5YW46IFwiXFx4MWJbMzZtXCIsXG4gIEZnV2hpdGU6IFwiXFx4MWJbMzdtXCIsXG4gIEJnQmxhY2s6IFwiXFx4MWJbNDBtXCIsXG4gIEJnUmVkOiBcIlxceDFiWzQxbVwiLFxuICBCZ0dyZWVuOiBcIlxceDFiWzQybVwiLFxuICBCZ1llbGxvdzogXCJcXHgxYls0M21cIixcbiAgQmdCbHVlOiBcIlxceDFiWzQ0bVwiLFxuICBCZ01hZ2VudGE6IFwiXFx4MWJbNDVtXCIsXG4gIEJnQ3lhbjogXCJcXHgxYls0Nm1cIixcbiAgQmdXaGl0ZTogXCJcXHgxYls0N21cIixcbn0gYXMgY29uc3Q7XG4iLCAiLyoqXG4gKiBDaGVja2VyIHRoYXQgdGhlIHBsdWdpbiBpcyBjYWxsZWQgb25seSBvbmNlIGF0IGJ1aWxkIHRpbWVcbiAqIFx1RDUwQ1x1QjdFQ1x1QURGOFx1Qzc3OCBcdUQ2MzhcdUNEOUNcdUMyREMgXHVENTVDIFx1QkM4OFx1QjlDQyBcdUQ2MzhcdUNEOUNcdUI0MThcdUIzQzRcdUI4NUQgXHVDQ0I0XHVEMDZDXHVENTU4XHVCMjk0IFx1QzVFRFx1RDU2MFx1Qzc0NCBcdUQ1NUNcdUIyRTRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tDYWxsZWQoKSB7XG4gIGxldCBfaXNDYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIHtcbiAgICBpc0NhbGxlZCgpIHtcbiAgICAgIHJldHVybiBfaXNDYWxsZWQ7XG4gICAgfSxcbiAgICBjYWxsKCkge1xuICAgICAgX2lzQ2FsbGVkID0gdHJ1ZTtcbiAgICB9LFxuICB9O1xufVxuIiwgImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGNvbG9yTG9nIGZyb20gXCIuL3V0aWxzL2NvbG9yLWxvZ1wiO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuLi9zcmMvbWFuaWZlc3RcIjtcblxuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoO1xuXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKFwiL1VzZXJzL3VucW9jbi9jaHJvbWUtZXh0ZW5zaW9uLWJvaWxlcnBsYXRlL3BsdWdpbnNcIiwgXCIuLlwiLCBcImRpc3RcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VNYW5pZmVzdCgpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcIm1ha2UtbWFuaWZlc3RcIixcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHJlc29sdmUob3V0RGlyLCBcIm1hbmlmZXN0Lmpzb25cIik7XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3RQYXRoLCBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCkpO1xuXG4gICAgICBjb2xvckxvZyhgTWFuaWZlc3QgZmlsZSBjb3B5IGNvbXBsZXRlOiAke21hbmlmZXN0UGF0aH1gLCBcInN1Y2Nlc3NcIik7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJpbXBvcnQgcGFja2FnZUpzb24gZnJvbSBcInBhY2thZ2UuanNvblwiO1xuaW1wb3J0IHsgTWFuaWZlc3RUeXBlIH0gZnJvbSBcIkBzcmMvbWFuaWZlc3QtdHlwZVwiO1xuXG5jb25zdCBtYW5pZmVzdDogTWFuaWZlc3RUeXBlID0ge1xuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICBuYW1lOiBwYWNrYWdlSnNvbi5uYW1lLFxuICB2ZXJzaW9uOiBwYWNrYWdlSnNvbi52ZXJzaW9uLFxuICBkZXNjcmlwdGlvbjogcGFja2FnZUpzb24uZGVzY3JpcHRpb24sXG4gIG9wdGlvbnNfcGFnZTogXCJvcHRpb25zLmh0bWxcIixcbiAgYmFja2dyb3VuZDogeyBzZXJ2aWNlX3dvcmtlcjogXCJiYWNrZ3JvdW5kLmpzXCIgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogXCJwb3B1cC5odG1sXCIsXG4gICAgZGVmYXVsdF9pY29uOiBcImljb24tMzQucG5nXCIsXG4gIH0sXG4gIGNocm9tZV91cmxfb3ZlcnJpZGVzOiB7XG4gICAgbmV3dGFiOiBcIm5ld3RhYi5odG1sXCIsXG4gIH0sXG4gIGljb25zOiB7XG4gICAgXCIxMjhcIjogXCJpY29uLTEyOC5wbmdcIixcbiAgfSxcbiAgY29udGVudF9zY3JpcHRzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogW1wiaHR0cDovLyovKlwiLCBcImh0dHBzOi8vKi8qXCIsIFwiPGFsbF91cmxzPlwiXSxcbiAgICAgIGpzOiBbXCJjb250ZW50LmpzXCJdLFxuICAgICAgY3NzOiBbXCJjb250ZW50LnN0eWxlcy5jc3NcIl0sXG4gICAgfSxcbiAgXSxcbiAgZGV2dG9vbHNfcGFnZTogXCJkZXZ0b29scy5odG1sXCIsXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xuICAgIHtcbiAgICAgIHJlc291cmNlczogW1wiY29udGVudC5zdHlsZXMuY3NzXCIsIFwiaWNvbi0xMjgucG5nXCIsIFwiaWNvbi0zNC5wbmdcIl0sXG4gICAgICBtYXRjaGVzOiBbXSxcbiAgICB9LFxuICBdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFuaWZlc3Q7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQ0hBO0FBQ0E7OztBQ0NlLGtCQUFrQixTQUFpQixNQUFrQjtBQUNsRSxNQUFJLFFBQWdCLFFBQVEsT0FBTztBQUVuQyxVQUFRO0FBQUEsU0FDRDtBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsU0FDRztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsU0FDRztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsU0FDRztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUE7QUFHSixVQUFRLElBQUksT0FBTyxPQUFPO0FBQzVCO0FBRUEsSUFBTSxTQUFTO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQ1g7OztBQzNDZSx1QkFBdUI7QUFDcEMsTUFBSSxZQUFZO0FBQ2hCLFNBQU87QUFBQSxJQUNMLFdBQVc7QUFDVCxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsT0FBTztBQUNMLGtCQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRjs7O0FGVEEsSUFBTSxFQUFFLFlBQVk7QUFFcEIsSUFBTSxZQUFZLFFBQVEsc0RBQXNELFdBQVc7QUFDM0YsSUFBTSxXQUFXLFFBQVEsc0RBQXNELGNBQWM7QUFFN0YsSUFBTSxVQUFVLENBQUMsVUFBVSxTQUFTLFlBQVksV0FBVyxPQUFPO0FBRW5ELHdCQUF3QjtBQUNyQyxRQUFNLFVBQVUsWUFBWTtBQUM1QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQ1gsVUFBSSxRQUFRLFNBQVMsR0FBRztBQUN0QjtBQUFBLE1BQ0Y7QUFFQSxjQUFRLFFBQVEsQ0FBQyxXQUFXO0FBQzFCLGNBQU0sT0FBTyxRQUFRLFVBQVUsUUFBUSxZQUFZO0FBQ25ELGNBQU0sS0FBSyxRQUFRLFdBQVcsR0FBRyxPQUFPLFlBQVksUUFBUTtBQUU1RCxRQUFHLGdCQUFhLE1BQU0sRUFBRTtBQUN4QixpQkFBUyxnQ0FBZ0MsTUFBTSxTQUFTO0FBQUEsTUFDMUQsQ0FBQztBQUVELGNBQVEsS0FBSztBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBQ0Y7OztBR2hDQTtBQUNBOzs7QUNEQTtBQUdBLElBQU0sV0FBeUI7QUFBQSxFQUM3QixrQkFBa0I7QUFBQSxFQUNsQixNQUFNLFlBQVk7QUFBQSxFQUNsQixTQUFTLFlBQVk7QUFBQSxFQUNyQixhQUFhLFlBQVk7QUFBQSxFQUN6QixjQUFjO0FBQUEsRUFDZCxZQUFZLEVBQUUsZ0JBQWdCLGdCQUFnQjtBQUFBLEVBQzlDLFFBQVE7QUFBQSxJQUNOLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0Esc0JBQXNCO0FBQUEsSUFDcEIsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNmO0FBQUEsTUFDRSxTQUFTLENBQUMsY0FBYyxlQUFlLFlBQVk7QUFBQSxNQUNuRCxJQUFJLENBQUMsWUFBWTtBQUFBLE1BQ2pCLEtBQUssQ0FBQyxvQkFBb0I7QUFBQSxJQUM1QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmLDBCQUEwQjtBQUFBLElBQ3hCO0FBQUEsTUFDRSxXQUFXLENBQUMsc0JBQXNCLGdCQUFnQixhQUFhO0FBQUEsTUFDL0QsU0FBUyxDQUFDO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sbUJBQVE7OztBRC9CZixJQUFNLEVBQUUsc0JBQVk7QUFFcEIsSUFBTSxTQUFTLFNBQVEsc0RBQXNELE1BQU0sTUFBTTtBQUUxRSx3QkFBd0I7QUFDckMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sV0FBVztBQUNULFlBQU0sZUFBZSxTQUFRLFFBQVEsZUFBZTtBQUVwRCxNQUFHLGtCQUFjLGNBQWMsS0FBSyxVQUFVLGdCQUFRLENBQUM7QUFFdkQsZUFBUyxnQ0FBZ0MsZ0JBQWdCLFNBQVM7QUFBQSxJQUNwRTtBQUFBLEVBQ0Y7QUFDRjs7O0FKYkEsSUFBTSxPQUFPLFNBQVEsOENBQThDLEtBQUs7QUFDeEUsSUFBTSxZQUFXLFNBQVEsTUFBTSxPQUFPO0FBQ3RDLElBQU0sWUFBWSxTQUFRLE1BQU0sUUFBUTtBQUN4QyxJQUFNLFVBQVMsU0FBUSw4Q0FBOEMsTUFBTTtBQUMzRSxJQUFNLGFBQVksU0FBUSw4Q0FBOEMsUUFBUTtBQUVoRixJQUFNLGdCQUFnQyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFFckUsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixHQUFHO0FBQUEsSUFDSCxpQkFBaUI7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxPQUFPLFNBQVEsV0FBVSxVQUFVLFdBQVc7QUFBQSxVQUM5QyxVQUFVO0FBQUEsVUFDVixVQUFVO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU8sU0FBUSxXQUFVLFdBQVcsV0FBVztBQUFBLFVBQy9DLFVBQVU7QUFBQSxVQUNWLFVBQVU7QUFBQSxRQUNaO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTyxTQUFRLFdBQVUsU0FBUyxXQUFXO0FBQUEsVUFDN0MsVUFBVTtBQUFBLFVBQ1YsVUFBVTtBQUFBLFFBQ1o7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPLFNBQVEsV0FBVSxTQUFTLFdBQVc7QUFBQSxVQUM3QyxVQUFVO0FBQUEsVUFDVixVQUFVO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU8sU0FBUSxXQUFVLFlBQVksVUFBVTtBQUFBLFVBQy9DLFVBQVU7QUFBQSxVQUNWLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUVMLGNBQWMsU0FBUSxXQUFVLFdBQVcsbUJBQW1CO0FBQUEsUUFFOUQsU0FBUyxTQUFRLFdBQVUsV0FBVyxVQUFVO0FBQUEsUUFDaEQsWUFBWSxTQUFRLFdBQVUsY0FBYyxVQUFVO0FBQUEsTUFDeEQ7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLFVBQVU7QUFDekIsY0FBSSxNQUFNLFNBQVMsZ0JBQWdCO0FBQ2pDLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGlCQUFPLEdBQUcsTUFBTTtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVSxDQUFDLFFBQVE7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
