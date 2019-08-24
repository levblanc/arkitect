'use strict';

const program = require('commander')
const packageJson = require('../package.json')
const checkNodeVersion = require('../src/checkNodeVersion')
// const getEnvInfo = require('../src/getEnvInfo')
// const validateProjectName = require('../src/validateProjectName')
// const initApp = require('../src/initApp')

let appName;

checkNodeVersion()