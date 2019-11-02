const debug = require('../lib/debug')('controllers:knights')
const Knight = require('../models/knight')

exports.list = (req, res) => {
    try {
        const knights = Knight.find()
        debug(JSON.stringify(knights, null, 2))
        res.json({ docs: knights })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.insert = (req, res) => {
    try {
        const { body } = req
        debug('body', JSON.stringify(body))
        const knight = Knight.insert(body)
        res.status(201).json(knight)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}