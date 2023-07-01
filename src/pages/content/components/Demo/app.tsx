import { useEffect } from "react";
import { i18n } from "@src/chrome/i18n";

export default function App() {
  useEffect(() => {
    console.log("content view loaded");
  }, []);

  return (
    <div className="content-view text-lime-400">{i18n("content_view")}</div>
  );
}
