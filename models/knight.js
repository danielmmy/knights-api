const { Schema } = require('mongoose')
const conn = require('../lib/mongoose')

const schema = new Schema({
    name: String,
    nickname: String
})

module.exports = conn.model('Knight', schema)