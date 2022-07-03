import { createRoot } from "react-dom/client";
import App from "@pages/contentView/app";

const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
document.body.append(root);

createRoot(root).render(<App />);
