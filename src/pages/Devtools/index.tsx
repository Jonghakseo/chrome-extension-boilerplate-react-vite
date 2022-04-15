import React from "react";
import { createRoot } from "react-dom/client";
import Devtools from "@src/pages/Devtools/Devtools";
import "@pages/Devtools/index.css";

function init() {
  try {
    chrome.devtools.panels.create(
      "My new Dev Tools panel",
      "icon-34.png",
      "devtools.html"
    );
  } catch (e) {
    console.error(e);
  }
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(<Devtools />);
}

init();
