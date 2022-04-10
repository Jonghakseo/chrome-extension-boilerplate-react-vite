import React from "react";
import { render } from "react-dom";

import "@pages/Panel/index.css";
import Panel from "@pages/Panel/Panel";

render(<Panel />, window.document.querySelector("#app-container"));
