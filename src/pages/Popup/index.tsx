import React from "react";
import { createRoot } from "react-dom/client";
import "@pages/Popup/index.css";
import Popup from "@pages/Popup/Popup";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    return;
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
