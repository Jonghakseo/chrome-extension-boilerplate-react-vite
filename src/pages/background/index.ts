import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
const browser = require("webextension-polyfill");
const supabase = require("@src/utils/superbaseClient");

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");
console.log("supabase", supabase);
