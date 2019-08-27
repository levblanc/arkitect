'use strict';

const validatePkgName = require('validate-npm-package-name')
const logger = require('@arkitect/ark-dev-utils/logger')

module.exports = (projectName) => {
  const {
    validForNewPackages,
    errors,
    warnings
  } = validatePkgName(projectName)

  if (!validForNewPackages) {
    logger.error(`Could not init project with name "${projectName}".`)

    if (errors) {
      logger.error('Npm naming errors:')
      logger.list(errors)
    } 

    if (warnings) {
      logger.warning('Npm naming warnings:')
      logger.list(warnings, 'warning')
    }

    process.exit(1)
  }
}