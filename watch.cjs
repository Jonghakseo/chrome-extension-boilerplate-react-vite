const util = require("util");
const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const debounce = require("debounce");

function execBuild() {
  const [shell, path, vite, build] = process.argv;
  exec(`${vite} ${build}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(stdout, stderr);
      console.log("----- In dev mode -----");
    }
  });
}

function run() {
  execBuild();

  const onChange = () => {
    execBuild();
  };

  fs.watch(
    path.resolve(__dirname, "src"),
    { recursive: true },
    debounce(onChange, 300)
  );
}

run();
