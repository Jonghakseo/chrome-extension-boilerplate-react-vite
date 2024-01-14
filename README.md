<div align="center">
<img src="public/icon-128.png" alt="logo"/>
<h1> Chrome Extension Boilerplate with<br/>React + Vite + TypeScript</h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)
![GitHub action badge](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/actions/workflows/build-zip.yml/badge.svg)
<img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/Jonghakseo/chrome-extension-boilerplate-react-viteFactions&count_bg=%23#222222&title_bg=%23#454545&title=😀&edge_flat=true" alt="hits"/>


> This project is listed in the [Awesome Vite](https://github.com/vitejs/awesome-vite)

</div>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Installation](#installation)
    - [Procedures](#procedures)
        - [Chrome](#chrome)
        - [Firefox](#firefox)
- [Add Style Library](#add-style-library)
    - [Twind](#twind)
    - [Chakra UI](#chakra-ui)
- [Pages](#pages)
- [Screenshots](#screenshots)
    - [NewTab](#newtab)
    - [Popup](#popup)
    - [Devtools](#devtools)
- [Examples](#examples)
- [Documents](#documents)

## Intro <a name="intro"></a>

This boilerplate is made for creating chrome extensions using React and Typescript.
> The focus was on improving the build speed and development experience with Vite.

## Features <a name="features"></a>

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/getting-started.html#automatic-recommended)
- [Commitlint](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- HRR(Hot Rebuild & Refresh/Reload)

## Installation <a name="installation"></a>

## Procedures: <a name="procedures"></a>

1. Clone this repository.
2. Change `extensionDescription` and `extensionName` in messages.json
3. Install pnpm globally: `npm install -g pnpm` (check your node version >= 16.6, recommended >= 18)
4. Run `pnpm install`

## And next, depending on the needs:

### For Chrome: <a name="chrome"></a>

1. Run:
    - Dev: `pnpm dev` or `npm run dev`
    - Prod: `pnpm build` or `npm run build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder

### For Firefox: <a name="firefox"></a>

1. Run:
    - Dev: `pnpm dev:firefox` or `npm run dev:firefox`
    - Prod: `pnpm build:firefox` or `npm run build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>

## Add Style Library <a name="add-style-library"></a>

> IMPORTANT: If you DO NOT want to use css file in the content script, you need to delete the css file in your manifest.js

```js
content_scripts: [
  {
    // YOU NEED TO DELETE THIS
    css: ["assets/css/contentStyle<KEY>.chunk.css"]
  }
];
```

### Twind <a name="twind"></a>

> The smallest, fastest, most feature complete Tailwind-in-JS solution in existence

**1. Install the library:**

```bash
$ pnpm install -D @twind/core @twind/preset-autoprefix @twind/preset-tailwind
```

**2. Create twind.config.ts in the root folder**

<details>
<summary>twind.config.ts</summary>

```ts
import { defineConfig } from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import presetAutoprefix from '@twind/preset-autoprefix';

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
});
```

</details>

**3. Create src/shared/style/twind.ts for importing**

<details>
<summary>src/shared/style/twind.ts</summary>

```ts
import { twind, cssom, observe } from '@twind/core';
import 'construct-style-sheets-polyfill';
import config from '@root/twind.config';

export function attachTwindStyle<T extends { adoptedStyleSheets: unknown }>(
  observedElement: Element,
  documentOrShadowRoot: T,
) {
  const sheet = cssom(new CSSStyleSheet());
  const tw = twind(config, sheet);
  observe(tw, observedElement);
  documentOrShadowRoot.adoptedStyleSheets = [sheet.target];
}
```

</details>

**4. You can use Tailwind in your project:**

<details>
<summary>src/pages/popup/index.tsx</summary>

```tsx
import { attachTwindStyle } from '@src/shared/style/twind';

...
attachTwindStyle(appContainer, document);
const root = createRoot(appContainer);
root.render(<Popup />);
```

</details>

**5. If you want to use Twind in the content script, you need to add the following code:**

<details>
<summary>src/pages/content/ui/index.tsx</summary>

```tsx
import { attachTwindStyle } from '@src/shared/style/twind';

...
attachTwindStyle(rootIntoShadow, shadowRoot);
createRoot(rootIntoShadow).render(<App />);
```
</details>

[See more examples](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/244/)

### Chakra UI <a name="chakra-ui"></a>

**1. Install the library:**

```bash
$ pnpm install @chakra-ui/react @emotion/cache @emotion/react
```

**2. You should add the code to `vite.config.ts`
for [Ignore unnecessary warnings](https://github.com/TanStack/query/pull/5161#issuecomment-1506683450)**

<details>
<summary>vite.config.ts</summary>

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      // Add below code ~~~~~
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes(`"use client"`)
        ) {
          return;
        }
        warn(warning);
      },
      // Add above code ~~~~
    },
  },
});
```

</details>

**3. You can use Chakra UI in your project:**

<details>
<summary>src/pages/popup/Popup.tsx</summary>

```tsx
import { Button } from "@chakra-ui/react";

export default function Popup() {
  return <Button colorScheme="teal">Button</Button>;
}
```

</details>

---

> if you don't want to use Chakra UI in the content script, you can skip 4,5 step.

**4. If you want to use Chakra UI in the content script, you need to add the following code:**

<details>
<summary>src/pages/content/ui/CustomChakraProvider.tsx</summary>

```tsx
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  ColorMode,
  ColorModeContext,
  ColorModeScript,
  CSSReset,
  extendTheme,
  GlobalStyle,
  ThemeProvider
} from "@chakra-ui/react";

const theme = extendTheme();

const getCurrentTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
};

type CustomChakraProviderProps = {
  shadowRootId: string;
  children: ReactNode;
};
export default function CustomChakraProvider({ children, shadowRootId }: CustomChakraProviderProps) {
  const [colorMode, setColorMode] = useState<ColorMode>(getCurrentTheme());

  useEffect(() => {
    const darkThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChangeColorSchema = (event: MediaQueryListEvent) => {
      const isDark = event.matches;
      setColorMode(isDark ? "dark" : "light");
    };

    darkThemeMediaQuery.addEventListener("change", onChangeColorSchema);

    return () => {
      darkThemeMediaQuery.removeEventListener("change", onChangeColorSchema);
    };
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode(prev => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeProvider theme={theme} cssVarsRoot={`#${shadowRootId}`}>
      <ColorModeScript initialColorMode="system" />
      <ColorModeContext.Provider value={{ colorMode, setColorMode, toggleColorMode }}>
        <CSSReset />
        <GlobalStyle />
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}
```

</details>
<details>
<summary>src/pages/content/ui/EmotionCacheProvider.tsx</summary>

```tsx
import createCache from '@emotion/cache';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import { ReactNode, useEffect, useState } from 'react';

export default function EmotionCacheProvider({ children, rootId }: { rootId: string; children: ReactNode }) {
  const [emotionCache, setEmotionCache] = useState<EmotionCache | null>(null);

  useEffect(() => {
    function setEmotionStyles(shadowRoot: ShadowRoot) {
      setEmotionCache(
        createCache({
          key: rootId,
          container: shadowRoot,
        }),
      );
    }

    const root = document.getElementById(rootId);
    if (root && root.shadowRoot) {
      setEmotionStyles(root.shadowRoot);
    }
  }, []);

  return emotionCache ? <CacheProvider value={emotionCache}>{children}</CacheProvider> : null;
}
```

</details>

**5. Fix the `src/pages/content/index.tsx` file:**

<details>
<summary>src/pages/content/index.tsx</summary>

```tsx
import CustomChakraProvider from '@pages/content/ui/CustomChakraProvider';
import EmotionCacheProvider from '@pages/content/ui/EmotionCacheProvider';

// ...

createRoot(rootIntoShadow).render(
  // Add Providers
  <EmotionCacheProvider rootId={root.id}>
    <CustomChakraProvider shadowRootId={rootIntoShadow.id}>
      <App />
    </CustomChakraProvider>
  </EmotionCacheProvider>,
);

```

</details>

## Pages <a name="pages"></a>

### New Tab <a name="newtab"></a>

[Override Chrome pages](https://developer.chrome.com/docs/extensions/mv3/override/)<br/>`chrome_url_overrides.newtab` in
manifest.json

### Popup <a name="popup"></a>

[Browser actions](https://developer.chrome.com/docs/extensions/reference/browserAction/)<br/>`action.default_popup` in
manifest.json

### Devtools <a name="devtools"></a>

[Devtools](https://developer.chrome.com/docs/extensions/mv3/devtools/#creating)<br/>`devtools_page` in manifest.json

### Background <a name="background"></a>

[Background](https://developer.chrome.com/docs/extensions/mv3/background_pages/)<br/>`background.service_worker` in
manifest.json

### ContentScript <a name="contentscript"></a>

[Content Script (contentInjected/contentUI)](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)<br/>`content_scripts` in
manifest.json

### Options <a name="options"></a>

[Options](https://developer.chrome.com/docs/extensions/mv3/options/)<br/>`options_page` in manifest.json

### SidePanel (Chrome 114+) <a name="sidepanel"></a>

[SidePanel](https://developer.chrome.com/docs/extensions/reference/sidePanel/)<br/>`side_panel.default_path` in
manifest.json

## Screenshots <a name="screenshots"></a>

### New Tab <a name="newtab"></a>

<img width="800" alt="newtab" src="https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/assets/53500778/3e782e41-b605-4956-90e2-20cc48252820">

### Popup <a name="popup"></a>

| Black                                                                                                                                                          | White                                                                                                                                                          |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <img width="300" alt="black" src="https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/assets/53500778/35423617-e6f5-4f65-adb3-03f068236648"> | <img width="300" alt="white" src="https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/assets/53500778/99886d92-b6f0-4e41-b70e-5afc6d2f7eab"> |

### Devtools <a name="devtools"></a>

<img width="450" alt="devtools" src="https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/assets/53500778/467d719d-a7db-4f77-8504-cd5ce7567793">

## Examples <a name="examples"></a>

- https://github.com/Jonghakseo/drag-gpt-extension
- https://github.com/Jonghakseo/pr-commit-noti
- https://github.com/ariburaco/chatgpt-file-uploader-extended

## Documents <a name="documents"></a>

- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [ChromeExtension](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Jonghakseo/chrome-extension-boilerplate-react-vite&type=Date)](https://star-history.com/#Jonghakseo/chrome-extension-boilerplate-react-vite&Date)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JunyWuuuu91"><img src="https://avatars.githubusercontent.com/u/33750626?v=4?s=50" width="50px;" alt="JunyWuuuu91"/><br /><sub><b>JunyWuuuu91</b></sub></a><br /><a href="#code-JunyWuuuu91" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dim0147"><img src="https://avatars.githubusercontent.com/u/44487221?v=4?s=50" width="50px;" alt="dim0147"/><br /><sub><b>dim0147</b></sub></a><br /><a href="#bug-dim0147" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.youtube.com/user/Learnbynet"><img src="https://avatars.githubusercontent.com/u/24865815?v=4?s=50" width="50px;" alt="jon lepage"/><br /><sub><b>jon lepage</b></sub></a><br /><a href="#bug-djmisterjon" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://lironhazan.com/"><img src="https://avatars.githubusercontent.com/u/9695142?v=4?s=50" width="50px;" alt="LironH"/><br /><sub><b>LironH</b></sub></a><br /><a href="#ideas-LironHazan" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://spencerchang.me"><img src="https://avatars.githubusercontent.com/u/14796580?v=4?s=50" width="50px;" alt="Spencer Chang"/><br /><sub><b>Spencer Chang</b></sub></a><br /><a href="#bug-spencerc99" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/deld123"><img src="https://avatars.githubusercontent.com/u/110054621?v=4?s=50" width="50px;" alt="deld123"/><br /><sub><b>deld123</b></sub></a><br /><a href="#bug-deld123" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hakunin"><img src="https://avatars.githubusercontent.com/u/65846?v=4?s=50" width="50px;" alt="Michal Hantl"/><br /><sub><b>Michal Hantl</b></sub></a><br /><a href="#ideas-hakunin" title="Ideas, Planning, & Feedback">🤔</a> <a href="#bug-hakunin" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://twitter.com/jordnb"><img src="https://avatars.githubusercontent.com/u/1463197?v=4?s=50" width="50px;" alt="Jordan Burgess"/><br /><sub><b>Jordan Burgess</b></sub></a><br /><a href="#ideas-jordn" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/NAMU1105"><img src="https://avatars.githubusercontent.com/u/47317129?v=4?s=50" width="50px;" alt="NAMEUN CHO"/><br /><sub><b>NAMEUN CHO</b></sub></a><br /><a href="#bug-NAMU1105" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Araneline"><img src="https://avatars.githubusercontent.com/u/2670262?v=4?s=50" width="50px;" alt="Andrew Mudrov"/><br /><sub><b>Andrew Mudrov</b></sub></a><br /><a href="#question-Araneline" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://shubhamlad.in"><img src="https://avatars.githubusercontent.com/u/30789414?v=4?s=50" width="50px;" alt="Shubham Lad"/><br /><sub><b>Shubham Lad</b></sub></a><br /><a href="#bug-ShuLaPy" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hanrongliao"><img src="https://avatars.githubusercontent.com/u/38458886?v=4?s=50" width="50px;" alt="hanrong"/><br /><sub><b>hanrong</b></sub></a><br /><a href="#bug-hanrongliao" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://koeni.dev"><img src="https://avatars.githubusercontent.com/u/32238636?v=4?s=50" width="50px;" alt="Florian König"/><br /><sub><b>Florian König</b></sub></a><br /><a href="#question-koenidv" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TP-O"><img src="https://avatars.githubusercontent.com/u/53143403?v=4?s=50" width="50px;" alt="Tran Phong"/><br /><sub><b>Tran Phong</b></sub></a><br /><a href="#bug-TP-O" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tonychandesign"><img src="https://avatars.githubusercontent.com/u/22465526?v=4?s=50" width="50px;" alt="tonychandesign"/><br /><sub><b>tonychandesign</b></sub></a><br /><a href="#bug-tonychandesign" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dellyn"><img src="https://avatars.githubusercontent.com/u/54443742?v=4?s=50" width="50px;" alt="Ihor Makarchuk"/><br /><sub><b>Ihor Makarchuk</b></sub></a><br /><a href="#bug-dellyn" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hugoobauer"><img src="https://avatars.githubusercontent.com/u/46481101?v=4?s=50" width="50px;" alt="hugoobauer"/><br /><sub><b>hugoobauer</b></sub></a><br /><a href="#bug-hugoobauer" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://itskaransingh.vercel.app"><img src="https://avatars.githubusercontent.com/u/112791089?v=4?s=50" width="50px;" alt="Karan Singh"/><br /><sub><b>Karan Singh</b></sub></a><br /><a href="#ideas-itskaransingh" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/remusris"><img src="https://avatars.githubusercontent.com/u/91991249?v=4?s=50" width="50px;" alt="remusris"/><br /><sub><b>remusris</b></sub></a><br /><a href="#ideas-remusris" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hegelwatch"><img src="https://avatars.githubusercontent.com/u/11195987?v=4?s=50" width="50px;" alt="hegel_dark"/><br /><sub><b>hegel_dark</b></sub></a><br /><a href="#ideas-hegelwatch" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lookis"><img src="https://avatars.githubusercontent.com/u/445022?v=4?s=50" width="50px;" alt="Jingsi"/><br /><sub><b>Jingsi</b></sub></a><br /><a href="#bug-lookis" title="Bug reports">🐛</a> <a href="#code-lookis" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/chrisozgo99"><img src="https://avatars.githubusercontent.com/u/46030410?v=4?s=50" width="50px;" alt="Chris Ozgo"/><br /><sub><b>Chris Ozgo</b></sub></a><br /><a href="#bug-chrisozgo99" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ssikyou"><img src="https://avatars.githubusercontent.com/u/5118469?v=4?s=50" width="50px;" alt="Cong"/><br /><sub><b>Cong</b></sub></a><br /><a href="#bug-ssikyou" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PatrykKuniczak"><img src="https://avatars.githubusercontent.com/u/64608510?v=4?s=50" width="50px;" alt="PatrykKuniczak"/><br /><sub><b>PatrykKuniczak</b></sub></a><br /><a href="#ideas-PatrykKuniczak" title="Ideas, Planning, & Feedback">🤔</a> <a href="#code-PatrykKuniczak" title="Code">💻</a> <a href="#doc-PatrykKuniczak" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hector.parra.cat"><img src="https://avatars.githubusercontent.com/u/34079?v=4?s=50" width="50px;" alt="Hector Parra"/><br /><sub><b>Hector Parra</b></sub></a><br /><a href="#bug-hector" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://blog.rhea-so.link"><img src="https://avatars.githubusercontent.com/u/25793226?v=4?s=50" width="50px;" alt="JeongHyeon Kim"/><br /><sub><b>JeongHyeon Kim</b></sub></a><br /><a href="#infra-rhea-so" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://terminels.com"><img src="https://avatars.githubusercontent.com/u/73331790?v=4?s=50" width="50px;" alt="Terminels"/><br /><sub><b>Terminels</b></sub></a><br /><a href="#code-PrinOrange" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wonkydd.com/"><img src="https://avatars.githubusercontent.com/u/81248624?v=4?s=50" width="50px;" alt="WonkyDD"/><br /><sub><b>WonkyDD</b></sub></a><br /><a href="#code-wonkyDD" title="Code">💻</a> <a href="#bug-wonkyDD" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wangxinyugithub"><img src="https://avatars.githubusercontent.com/u/39206932?v=4?s=50" width="50px;" alt="wangxy"/><br /><sub><b>wangxy</b></sub></a><br /><a href="#bug-wangxinyugithub" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/govza"><img src="https://avatars.githubusercontent.com/u/1425574?v=4?s=50" width="50px;" alt="Rasul"/><br /><sub><b>Rasul</b></sub></a><br /><a href="#doc-govza" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gavinhow"><img src="https://avatars.githubusercontent.com/u/16214376?v=4?s=50" width="50px;" alt="gavinhow"/><br /><sub><b>gavinhow</b></sub></a><br /><a href="#bug-gavinhow" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/anand-schultz"><img src="https://avatars.githubusercontent.com/u/133013727?v=4?s=50" width="50px;" alt="Anand D."/><br /><sub><b>Anand D.</b></sub></a><br /><a href="#doc-anand-schultz" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.iotercom.com"><img src="https://avatars.githubusercontent.com/u/521473?v=4?s=50" width="50px;" alt="Romain Dequidt"/><br /><sub><b>Romain Dequidt</b></sub></a><br /><a href="#doc-romaindequidt" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://linkedin.com/in/jguddas"><img src="https://avatars.githubusercontent.com/u/25524993?v=4?s=50" width="50px;" alt="Jakob Guddas"/><br /><sub><b>Jakob Guddas</b></sub></a><br /><a href="#doc-jguddas" title="Documentation">📖</a> <a href="#bug-jguddas" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://din.ooo"><img src="https://avatars.githubusercontent.com/u/2397125?v=4?s=50" width="50px;" alt="Dino Scheidt"/><br /><sub><b>Dino Scheidt</b></sub></a><br /><a href="#code-D1no" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://weekeight.github.io"><img src="https://avatars.githubusercontent.com/u/1918022?v=4?s=50" width="50px;" alt="秋知"/><br /><sub><b>秋知</b></sub></a><br /><a href="#code-weekeight" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tngflx"><img src="https://avatars.githubusercontent.com/u/36429783?v=4?s=50" width="50px;" alt="Hiverse"/><br /><sub><b>Hiverse</b></sub></a><br /><a href="#bug-tngflx" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rosendolu"><img src="https://avatars.githubusercontent.com/u/42633099?v=4?s=50" width="50px;" alt="rosendolu"/><br /><sub><b>rosendolu</b></sub></a><br /><a href="#code-rosendolu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://devkitty.app"><img src="https://avatars.githubusercontent.com/u/6418221?v=4?s=50" width="50px;" alt="Egor Stronhin"/><br /><sub><b>Egor Stronhin</b></sub></a><br /><a href="#doc-egor-xyz" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## Thanks To

| [Jetbrains](https://jb.gg/OpenSourceSupport)                                                                                               | [Jackson Hong](https://www.linkedin.com/in/j-acks0n/)                                            |
|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| <img width="100" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo (Main) logo."> | <img width="100" src='https://avatars.githubusercontent.com/u/23139754?v=4' alt='Jackson Hong'/> |

---

[Jonghakseo](https://nookpi.tistory.com/)
