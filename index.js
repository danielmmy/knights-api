const express = require('express')

const midDebugger = require('./middleware/debugger')
const bodyParser = require('./lib/body-parser')
const routes = require('./routes')

const app = express()

app.use([midDebugger, bodyParser, routes])

module.exports = app