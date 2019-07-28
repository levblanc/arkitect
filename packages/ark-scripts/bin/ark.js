"use strict";

const path = require("path");
const spawn = require("cross-spawn");
const chalk = require("chalk");
const script = process.argv[2];
const args = process.argv.slice(3);

const resolveScriptPath = script => {
  return path.resolve(__dirname, `../scripts/${script}`);
};

switch (script) {
  case "lint":
  case "format":
    const { status } = spawn.sync(
      "node",
      [resolveScriptPath(script)].concat(args),
      {
        stdio: "inherit"
      }
    );
    process.exit(status);

    break;
  default:
    console.log(chalk.red(`Unknown script '${script}'.`));
    console.log(
      chalk.red(`Check the following link for ark-scripts available.`)
    );
    console.log(chalk.red("https://github.com/levblanc/arkitect#readme"));
    break;
}
