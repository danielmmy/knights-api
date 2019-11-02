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
    }
}