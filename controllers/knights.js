const debug = require('../lib/debug')('controllers:knights')
const Knight = require('../models/knight')

exports.list = async (req, res) => {
    try {
        const knights = await Knight.find()
        debug('knights', JSON.stringify(knights, null, 2))
        res.json({ docs: knights })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.insert = async (req, res) => {
    try {
        const { body } = req
        debug('body', JSON.stringify(body))
        const knight = await Knight.create(body)
        res.status(201).json(knight)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.findById = async (req, res) => {
    try {
        const { id } = req.params
        const knight = await Knight.findById(id)
        if (!knight) { return res.status(404).json({ message: 'Knight not found' })}
        res.json(knight)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req

        debug(id, JSON.stringify(body, null,2 ))

        const updatedKnight = await Knight.findByIdAndUpdate(id, body, { new: true })

        if (!updatedKnight) {
            return res.status(404).json({ message: 'Knight not found' })
        }

        res.json(updatedKnight)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Knight.findByIdAndDelete(id)
        if (!deleted){
            return res.status(404).json({ message: 'Knight not found' })
        }
        res.status(204).json()

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}