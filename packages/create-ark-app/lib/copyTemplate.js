'use strict';

const fs = require('fs-extra')
const path = require('path')
const logger = require('@arkitect/ark-dev-utils/logger')

module.exports = async ({ templatePath, appPath, appName }) => {
  const spinner = logger.spinner()
  spinner.start('Project files initializing......')

  try {
    await fs.copy(templatePath, appPath)

    // Rename gitignore file to .gitignore
    // See:
    // https://github.com/yeoman/generator/issues/812#issuecomment-106318970
    // and
    // https://github.com/npm/npm/issues/1862
    await fs.move(
      path.resolve(appPath, './gitignore'),
      path.resolve(appPath, './.gitignore')
    )

    spinner.success(`Created project files for ${path.basename(appPath)}`)
  } catch (err) {
    spinner.fail('Project files init failed.')
    logger.error(err)

    process.exit(1)
  }
}