const { Schema } = require('mongoose')
const { table } = require('../lib/mod')
const conn = require('../lib/mongoose')
const options = { toJSON: { virtuals: true } }

const baseAttack = Number(process.env.BASE_ATTACK) || 10

const schema = new Schema({
    name: String,
    nickname: String,
    birthday: Date,
    gender: String,
    weapons: [],
    attributes: {
        strength: Number,
        dexterity: Number,
        constitution: Number,
        intelligence: Number,
        wisdom: Number,
        charisma: Number,
    },
    keyAttribute: String
}, options)

schema.virtual('attack').get(function () {
    const equippedWeapon = this.weapons.find((w) => w.equipped) || { mod: 0}
    return baseAttack + table(this.attributes[this.keyAttribute]) + equippedWeapon.mod 
})

module.exports = conn.model('Knight', schema)