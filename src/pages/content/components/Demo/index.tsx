import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/Demo/app";

const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
document.body.append(root);

createRoot(root).render(<App />);
