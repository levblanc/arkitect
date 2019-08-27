'use strict'

const semver = require('semver')
const logger = require('@arkitect/ark-dev-utils/logger')

module.exports = (targetVersion) => {
  const userVersion = process.version

  if (!semver.satisfies(userVersion, targetVersion)) {
    logger.error(
      'Error:\n' +
      'Your Node.js version is: ' + userVersion + '.\n' +
      'But create-ark-app requires Node ' + targetVersion + ' or higher to run.\n' +
      'Please upgrade your Node.js version.'
    )

    process.exit(1)
  }

  if (semver.satisfies(userVersion, '9.x')) {
    logger.warning(
      'You are using Node.js ' + userVersion + '.\n' +
      'Node.js 9.x has already reached end-of-life.\n' +
      "It's strongly recommended to use an active LTS version instead."
    )
  }
}