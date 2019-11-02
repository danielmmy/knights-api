const debug = require('debug')
const pkg = require('../package.json')

/**
 * Log
 */
module.exports = (mod) => debug(`${pkg.name}:${mod}:`)