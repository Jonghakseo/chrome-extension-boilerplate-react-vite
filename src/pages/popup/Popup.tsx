import React from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-lime-400">
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <button
          style={{
            color: theme === "light" ? "#fff" : "#000",
          }}
          onClick={exampleThemeStorage.toggle}
        >
          Toggle theme: [{theme}]
        </button>
      </header>
    </div>
  );
};

export default withSuspense(Popup);
