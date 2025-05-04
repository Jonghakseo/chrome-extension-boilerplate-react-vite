# Content Script

This tool allows you to inject Console Scripts into all pages specified by you.

https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts

### Add New Script

1. Copy `matches/example` folder and paste it with other name and edit content.
2. Edit `manifest.ts`:
- In `content-scripts` section add object with:

```ts
{
  matches: ['URL_FOR_INJECT'], 
  js: ['content/{matches_folder_name}.iife.js']
}
```