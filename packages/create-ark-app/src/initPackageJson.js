'use strict';

const os = require('os')
const path = require('path')
const fs = require('fs-extra')

module.exports = ({ appPath, appName, type }) => {
  let packageJson = {
    name: appName,
    version: '0.0.0',
    scripts: {
      start: 'ark start',
      build: 'ark build'
    },
    // https://github.com/browserslist/browserslist#best-practices
    browserslist: {
      production: ['>0.2%', 'not dead', 'not op_mini all'],
      development: [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version'
      ]
    }
  }

  fs.writeFileSync(
    path.resolve(appPath, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )
}