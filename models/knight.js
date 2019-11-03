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
    weapons: [{
        weapon: {
            type: Schema.Types.ObjectId,
            ref: 'Weapon'
        },
        equipped: {
            type: Boolean,
            default: false
        },
    }],
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

schema.virtual('age').get(function () {
    return Math.floor((new Date() - this.birthday) / 1000 / 60 / 60 / 24 / 365)
})

schema.virtual('experience').get(function () {
    const age =  Math.floor((new Date() - this.birthday) / 1000 / 60 / 60 / 24 / 365)
    if (age < 8){
        return 0
    }
    return Math.floor( (age-7) * Math.pow(22, 1.45) )
})

module.exports = conn.model('Knight', schema)