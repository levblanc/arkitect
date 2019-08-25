'use strict';

const program = require('commander')
const packageJson = require('../package.json')
const checkNodeVersion = require('../src/checkNodeVersion')
const getEnvInfo = require('../src/getEnvInfo')
const validateProjectName = require('../src/validateProjectName')
// const initApp = require('../src/initApp')

let appName;

checkNodeVersion()

program
  .version(packageJson.version)
  .arguments('<project-dir>')
  .usage('<project-dir> [option]')
  .action((name) => {
    appName = name
  })
  .option(
    '--vue',
    'Use Vue.js framework'
  )
  .option(
    '--type <boilerplate-type>',
    'Choose project boilerplate type, default as "basic"'
  )
  .option(
    '--verbose',
    'Log additional details'
  )
  .option(
    '--info',
    'Print env debug info'
  )
  .allowUnknownOption()
  .parse(process.argv)

const {
  vue,
  type = 'basic',
  verbose = false,
  info
} = program

// console.log('vue', vue);
// console.log('type', type);
// console.log('verbose', verbose);
// console.log('info', info);

if (info) getEnvInfo()

validateProjectName(appName)