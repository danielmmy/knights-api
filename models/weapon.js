const { Schema } = require('mongoose')
const conn = require('../lib/mongoose')

const schema = new Schema ({
    name: String,
    mod: Number,
    attr: String
})

module.exports = conn.model('Weapon', schema)