import React from "react";
import { createRoot } from "react-dom/client";
import Panel from "@pages/panel/Panel";
import "@pages/panel/index.css";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(<Panel />);
}

init();
