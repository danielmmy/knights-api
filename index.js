require('dotenv').config()

const express = require('express')

const midDebugger = require('./middleware/debugger')
const routes = require('./routes')

const app = express()

app.use([
    midDebugger,
    routes
])

module.exports = app