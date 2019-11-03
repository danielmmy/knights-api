const debug = require('../lib/debug')('controllers:knights')
const Knight = require('../models/knight')

exports.list = async (req, res) => {
    try {
        const { filter } = req.query
        const query = {}
        if (filter && filter.toLowerCase() === 'heroes') {
            query.decease = { $exists: true }
        }
        const knights = await Knight.find(query).populate(['weapons.weapon'])
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
        const knight = await Knight.findById(id).populate(['weapons.weapon'])
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

exports.updateNickname = async (req, res) => {
    try {
        const { id } = req.params
        const { nickname } = req.body

        const updatedKnight = await Knight.findByIdAndUpdate(id, {nickname}, {new: true})

        if (!updatedKnight) {
            return res.status(404).json({ message: 'Knight not found' })
        }

        res.json(updatedKnight)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.softDelete = async (req, res) => {
    try {
        const { id } = req.params
        const query = { _id: id, decease: { $exists: false }}
        const result = await Knight.updateOne(query, { decease: Date() }, { new: true })
        res.json(result)
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

exports.weapons = async (req, res) => {
    try {
        const { id } = req.params
        const select = { _id: 0, weapons: 1 }
        const equipments = await Knight.findById(id).select(select)
        res.json({ docs: equipments.weapons })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.addToInventory = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const asd= await Knight.findByIdAndUpdate(id, {
            $push: {
                weapons: {
                    weapon: body._id
                }
            }
        })
        res.status(204).json()
    } catch (err) {        
        res.status(500).json({ message: err.message })
    }
}

exports.equip = async (req, res) => {
    try {
        const { id } = req.params
        const weapon = req.body._id
        const query = { _id: id, 'weapons._id': weapon }
        debug('query', query)

        let result = await Knight.updateMany(query, {
            $set: {
                'weapons.$[].equipped': false
            }
        })

        result = await Knight.updateMany(query, {
            $set: {
                'weapons.$.equipped': true
            }
        })
        debug('equipped', JSON.stringify(result, null, 2))
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}