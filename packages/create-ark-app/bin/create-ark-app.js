'use strict';

const packageJson = require('../package.json')
const checkNodeVersion = require('../lib/checkNodeVersion')
const { version, engines: { node: targetVersion } } = packageJson

checkNodeVersion(targetVersion)

const program = require('commander')
const logger = require('@arkitect/ark-dev-utils/logger')
const getEnvInfo = require('../lib/getEnvInfo')
const validateProjectName = require('../lib/validateProjectName')
const initApp = require('../lib/initApp')

let appName;

program
  .version(version)
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

if (!appName) {
  const programName = 'create-ark-app'

  logger.error('Please provide your project directory:')
  console.log(`$ ${logger.cyan(programName)} ${logger.green('<project-dir>')}`)
  console.log()
  console.log('Example:')
  console.log(`$ ${logger.cyan(programName)} ${logger.green('my-app')}`)
  console.log()
  logger.info(`Run ${logger.cyan(`${programName} --help`)} to see all options.`)

  process.exit(1)
}

validateProjectName(appName)

initApp(appName, {
  framework: vue ? 'vue' : 'react',
  type,
  verbose
})