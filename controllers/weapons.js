const debug = require('../lib/debug')('controllers:weapons')
const Weapon = require('../models/weapon')


exports.list = async (req, res) => {
    try {
        const weapons = await Weapon.find()
        debug('weapons', JSON.stringify(weapons, null, 2))
        res.json({ docs: weapons })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}