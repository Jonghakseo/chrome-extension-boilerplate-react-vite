# Content Runtime Script

This tool allows you to inject Scripts (Console and UI) during runtime into all pages specified by you.

### Add New Script

1. Copy `matches/example` folder and paste it with other name or make folder manually, but you need to be sure
   `index.ts` is included.

2. Define somewhere:
```ts
await chrome.scripting.executeScript({
  ...,
  files: ['/content-runtime/{matches_folder_name}.iife.js'],
})
```