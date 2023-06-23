import React from "react";
import logo from "@assets/img/logo.svg";
import "@pages/newtab/Newtab.css";
import "@pages/newtab/Newtab.scss";

const Newtab = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/newtab/Newtab.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
        <span className="text-lime-400">
          The color of this paragraph is defined using Tailwind CSS.
        </span>
      </header>
    </div>
  );
};

export default Newtab;
