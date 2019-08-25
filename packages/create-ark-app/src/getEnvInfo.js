'use strict';

const envinfo = require('envinfo')
const logger = require('@arkitect/ark-dev-utils/logger')

module.exports = async () => {
  const spinner = logger.spinner()
  spinner.start('Getting env info, please wait ......')

  const result = await envinfo.run(
    {
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Browsers: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Internet Explorer'],
      npmPackages: ['@arkitect/ark-scripts'],
      npmGlobalPackages: ['@arkitect/arkitect', '@arkitect/create-ark-app']
    }, {
      json: true,
      duplicates: true,
      showNotFound: true
    }
  )

  spinner.info('Env info:')
  logger.success(result)
} 