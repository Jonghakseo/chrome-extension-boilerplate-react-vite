import React from "react";
import { createRoot } from "react-dom/client";
import Newtab from "@pages/newtab/Newtab";
import "@pages/newtab/index.css";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/newtab");

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(<Newtab />);
}

init();
