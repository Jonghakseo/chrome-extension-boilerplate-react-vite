import React from "react";
import { render } from "react-dom";

import Newtab from "@pages/Newtab/Newtab";
import "@pages/Newtab/index.css";

render(<Newtab />, window.document.querySelector("#app-container"));
