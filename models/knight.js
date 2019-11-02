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

    updateOne (id) {

    },

    delete (id) {
        if (!KNIGHTS[id]) {
            return false
        }
        KNIGHTS.splice(id, 1)
        return true
    },
}