const debug = require('../lib/debug')('controllers:weapons')
const Weapon = require('../models/weapon')


exports.list = async (req, res) => {
    try {
        const weapons = await Weapon.find({})
        debug('weapons', JSON.stringify(weapons, null, 2))
        res.json({ docs: weapons })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.insert = async (req, res) => {
    try {
        const { body } = req
        debug('body', JSON.stringify(body))
        const weapon = await Weapon.create(body)
        res.status(201).json(weapon)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Weapon.findByIdAndDelete(id)
        if (!deleted){
            return res.status(404).json({ message: 'Weapon not found' })
        }
        res.status(204).json()

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}