import React from "react";
import { render } from "react-dom";

import Popup from "@pages/Popup/Popup";
import "@pages/Popup/index.css";

render(<Popup />, window.document.querySelector("#app-container"));
