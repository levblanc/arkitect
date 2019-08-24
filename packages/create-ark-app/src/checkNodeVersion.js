'use strict'

const logger = require('./logger')

module.exports = () => {
    const nodeVersion = process.versions.node
    const majorVersion = nodeVersion.split('.')[0]

    if (majorVersion < 8) {
      logger.error(
        'Your Node.js version is: ' + nodeVersion + '.\n' +
        'create-ark-app requires Node 8 or higher to run.\n' + 
        'Please update your Node.js version.'
      )

      process.exit(1)
    }
}