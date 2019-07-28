"use strict";

const path = require("path");
const spawn = require("cross-spawn");
const ora = require("ora");
const chalk = require("chalk");
const debug = require("debug")("ark:format");
const { checkModule, getUserConfigs } = require("./utils");
const { PRETTIER_CONFIG, PRETTIER_IGNORE } = require("../config/patterns");

const prettier = checkModule("prettier");

const defaultConfig = path.resolve(__dirname, "../config/.prettierrc.js");
const defaultIgnore = path.resolve(__dirname, "../config/.prettierignore");
const filesToFormat = ["**/*.{js,jsx,css,sass,less,stylus,html,pug}"];

const userConfig = getUserConfigs(PRETTIER_CONFIG);
const userIgnore = getUserConfigs(PRETTIER_IGNORE);

debug("userConfig", userConfig);
debug("userIgnore", userIgnore);

const configFilePath = userConfig
  ? path.resolve(process.cwd(), userConfig)
  : defaultConfig;
const ignoreFilePath = userIgnore
  ? path.resolve(process.cwd(), userIgnore)
  : defaultIgnore;

const write = ["--write", filesToFormat];
const config = ["--config", configFilePath];
const ignore = ["--ignore-path", ignoreFilePath];
const logLevel = ["--loglevel", "warn"];

const spinner = ora(chalk.blue("Formatting your files")).start();

const result = spawn.sync(
  prettier,
  [...write, ...config, ...ignore, ...logLevel],
  {
    stdio: "inherit"
  }
);

debug("result", result);

if (result.error) {
  spinner.fail(chalk.red("Formating failed!"));

  const { stack, errno, code } = result.error;

  console.log(chalk.red("code", code));
  console.log(chalk.red("errno", errno));
  console.log(chalk.red(stack));

  process.exit(1);
}

if (result.signal) {
  spinner.info(chalk.yellow(`Formating terminated with signal ${signal}`));
  process.exit(1);
}

if (result.status === 0) {
  spinner.succeed(chalk.green("Format finished!"));
}

process.exit(result.status);
