const debug = require('../lib/debug')('middleware:middebugger')

module.exports = (req, res, next) => {
    debug(`[${req.method}] ${req.url}`)
    next()
}