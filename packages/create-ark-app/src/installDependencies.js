'use strict';

const path = require('path')
const spawn = require('cross-spawn')
const logger = require('@arkitect/ark-dev-utils/logger')

const isYarnInstalled = () => {
  let result

  result = spawn.sync(
    'yarnpkg',
    ['--version'],
    { stdio: 'inherit' }
  )

  return result.status === 0
}

const getCommandArgs = ({ cmd, appPath, dependencies, verbose }) => {
  let args

  if (cmd === 'yarn') {
    args = [
      'add',
      '--exact',
      '--cwd',
      appPath
    ]

    if (verbose) {
      args.push('--verbose')
    }
  } else if (cmd === 'npm') {
    args = [
      'install',
      '--save',
      '--save-exact',
      '--loglevel',
      verbose ? 'verbose' : 'error'
    ]
  }

  return args.concat(dependencies)
}

module.exports = ({ appPath, framework, verbose }) => {
  const cmd = isYarnInstalled() ? 'yarn' : 'npm'

  const dependencies = framework === 'react'
    ? ['react', 'react-dom', 'react-router-dom', 'express']
    : ['vue', 'vue-router', 'express']

  const cmdArgs = getCommandArgs({
    cmd,
    appPath,
    dependencies,
    verbose
  })

  // cd into project directory
  process.chdir(appPath)

  const spinner = logger.spinner()
  spinner.start('Installing the following dependencies, please wait......\n')
  logger.list(dependencies, 'info')
  console.log()

  const result = spawn.sync(
    cmd,
    cmdArgs,
    { stdio: 'inherit' }
  )

  if (result.error) {
    logger.spawnErr(result.error)
    process.exit(1)
  }

  if (result.signal) {
    logger.spawnSignal(result.signal)
    process.exit(1)
  }

  if (result.status === 0) {
    spinner.success('Project init success!')
    logger.info(`Check ${appPath}`)
    logger.info(`Run "cd ${path.basename(appPath)}" to go inside your project.`)
    logger.info('Following commands are ready for you:')
    // npm run dev 
    // npm run build
    // npm run prod
  }
}