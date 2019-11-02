const KNIGHTS = [
    {
        name: 'Arthur',
        nickname: 'A might king'
    },
]

module.exports = {
    find () {
        return KNIGHTS
    },

    insert (knight) {
        KNIGHTS.push(knight)
        return knight
    },

    findById (id) {
        return KNIGHTS[id]
    },

    updateOne (id, body) {
        const knight = KNIGHTS[id]
        if (!knight) { return null }
        KNIGHTS[id] = { ...KNIGHTS[id], ...body }
        return KNIGHTS[id]
    },

    delete (id) {
        if (!KNIGHTS[id]) {
            return false
        }
        KNIGHTS.splice(id, 1)
        return true
    },
}