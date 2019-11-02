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

exports.findById = (req, res) => {
    try {
        const { id } = req.params
        const knight = Knight.findById(id)
        if (!knight) { return res.status(404).json({ message: 'Knight not found' })}
        res.json(knight)
    } catch (err){
        res.status(500).json({message: err.message})
    }
}