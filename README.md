<div align="center">
<img src="public/icon-128.png" alt="logo"/>
<h1> Chrome Extension Boilerplate with Typescript + React + Vite</h1>
</div>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Installation](#installation)
  - [Procedures](#procedures)
- [Attention](#attention)


## Intro <a name="intro"></a>
This boilerplate is made for creating chrome extensions using React and Typescript.
> The focus was on improving the build speed and development experience with Vite.

## Features <a name="features"></a>
- React 17
- Typescript
- Vite
- sass
- eslint
- prettier
- Chrome Extension Manifest Version 3

## Installation <a name="installation"></a>

### Procedures <a name="procedures"></a>
1. Clone this repository.
2. Change `name` and `description` in package.json => **Auto synchronize with manifest** 
3. Run `yarn` or `npm i`
4. Run `yarn dev` or `npm run dev`
5. Load Extension on Chrome
   1. Open - Chrome browser
   2. Access - chrome://extensions
   3. Check - Developer mode
   4. Find - Load unpacked extension
   5. Select - `dist` folder in this project (after dev or build)
6. If you want to build in production, Just run `yarn build` or `npm run build`.

## Attention <a name="attention"></a>
- Html files in the public folder are automatically copied from inside the `src/pages` folder. So, if you want to edit the html template file, edit index.html in each page folder.
