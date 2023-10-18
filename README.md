
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
- [Screenshots](#screenshots)
    - [NewTab](#newtab)
    - [Popup](#popup)
- [Examples](#examples)
- [Documents](#documents)

## Intro <a name="intro"></a>

This boilerplate is made for creating chrome extensions using React and Typescript.
> The focus was on improving the build speed and development experience with Vite.

## Features <a name="features"></a>

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/)
- [Twind](https://twind.dev/)
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
2. Change `name` and `description` in package.json => **Auto synchronize with manifest**
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

## Screenshots <a name="screenshots"></a>

### New Tab <a name="newtab"></a>

<img width="971" src="https://user-images.githubusercontent.com/53500778/162631646-cd40976b-b737-43d0-8e6a-6ac090a2e2d4.png">

### Popup <a name="popup"></a>

<img width="314" alt="popup" src="https://user-images.githubusercontent.com/53500778/203561728-23517d46-12e3-4139-8a4f-e0b2f22a6ab3.png">

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
