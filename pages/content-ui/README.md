# Content UI Script

This tool allows you to inject React Components into all pages specified by you.

### Add New Script

1. Copy `matches/example` folder and paste it with other name and edit content.

   > [!NOTE]
   > Remember to edit import:
   > ```ts
   > import App from '@src/matches/{new_folder}/App';
   > ```

2. Edit `manifest.ts`:
- In `content-scripts` section add object with:

```ts
{
  matches: ['URL_FOR_INJECT'], 
  js: ['content-ui/{matches_folder_name}.iife.js']
}
```