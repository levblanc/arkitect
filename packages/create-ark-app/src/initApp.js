'use strict';

const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const os = require('os')
const spawn = require('cross-spawn')
const logger = require('@arkitect/ark-dev-utils/logger')
const initPackageJson = require('./initPackageJson')
const copyTemplate = require('./copyTemplate')
const installDependencies = require('./installDependencies')

// basic template:
// react boilerplate with nodejs + express.js backend for local dev

// advanced template
// basic template + core-js(for polyfill), axios, redux?, react-router-dom

module.exports = async (appName, options) => {
  if (fs.existsSync(appName)) {
    logger.error(
      'Folder "' + appName + '" already exsits.\n' +
      'Please try a different name or remove this folder first.'
    )

    process.exit(1)
  }

  const { framework, type, verbose } = options
  const templatePath = path.resolve(__dirname, `../templates/${framework}/${type}`)
  const appPath = `${process.cwd()}/${appName}`

  fsExtra.ensureDirSync(appName)
  logger.info(`Creating a new ${framework} app in:`)
  console.log(`${logger.green(appPath)}`)
  console.log()

  // init package.json
  initPackageJson({ appPath, appName, type })

  // copy template files
  await copyTemplate({
    templatePath,
    appPath,
    appName
  })

  // install dependencies
  installDependencies({
    appPath,
    framework,
    verbose
  })
}
