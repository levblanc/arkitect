"use strict";

const path = require("path");
const spawn = require("cross-spawn");
const ora = require("ora");
const chalk = require("chalk");
const debug = require("debug")("ark:lint");
const { checkModule, getUserConfigs } = require("./utils");
const { ESLINT_CONFIG, ESLINT_IGNORE } = require("../config/patterns");

const eslint = checkModule("eslint");

const defaultConfig = path.resolve(__dirname, "../config/.eslintrc.js");
const defaultIgnore = path.resolve(__dirname, "../config/.eslintignore");
const filesToLint = ["."];
const fileExtensions = [".js", ".jsx", ".vue"];

const userConfig = getUserConfigs(ESLINT_CONFIG);
const userIgnore = getUserConfigs(ESLINT_IGNORE);

debug("userConfig", userConfig);
debug("userIgnore", userIgnore);

const configFilePath = userConfig
  ? path.resolve(process.cwd(), userConfig)
  : defaultConfig;
const ignoreFilePath = userIgnore
  ? path.resolve(process.cwd(), userIgnore)
  : defaultIgnore;

const config = ["--config", configFilePath];
const ignore = ["--ignore-path", ignoreFilePath];
const ext = ["--ext", fileExtensions];

const spinner = ora(chalk.blue("Linting your files")).start();

const result = spawn.sync(
  eslint,
  ["--fix", ...config, ...ignore, ...ext, ...filesToLint],
  {
    stdio: "inherit"
  }
);

debug("result", result);

if (result.error) {
  spinner.fail(chalk.red("Linting failed!"));

  const { stack, errno, code } = result.error;

  console.log(chalk.red("code", code));
  console.log(chalk.red("errno", errno));
  console.log(chalk.red(stack));

  process.exit(1);
}

if (result.signal) {
  spinner.info(chalk.yellow(`Linting terminated with signal ${signal}`));
  process.exit(1);
}

if (result.status === 0) {
  spinner.succeed(chalk.green("Lint finished!"));
}

process.exit(result.status);
