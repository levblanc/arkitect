const glob = require("fast-glob");
const which = require("which");
const chalk = require("chalk");

const getUserConfigs = pattern => {
  const matches = glob.sync(pattern);
  return matches.length ? matches[0] : "";
};

const checkModule = moduleName => {
  const script = moduleName === "eslint" ? "lint" : "format";
  let resolved;

  resolved = which.sync(moduleName, {
    nothrow: true
  });

  if (!resolved) {
    console.log(chalk.red("Ark-Scripts Error:"));
    console.log(
      chalk.red(`Please install ${moduleName} on your machine globally or`)
    );
    console.log(chalk.red("install it as a dev dependency of this project"));
    console.log(chalk.red(`before running the ${script} script.`));

    process.exit(1);
  }

  return resolved;
};

module.exports = {
  checkModule,
  getUserConfigs
};
