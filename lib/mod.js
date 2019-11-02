module.exports = {
    table (value) {
        if (value >= 0 && value <= 8) {
            return -2
        } else if (value <= 10) {
            return -1
        } else if (value <= 12) {
            return 0
        } else if (value <= 15) {
            return 1
        } else if (value <= 18) {
            return 2
        } else if (value <= 20) {
            return 3
        }
        return null
    }
}