const { table } = require('../lib/mod')
const { expect } = require('chai')

describe ('Mod Table', () => {
    it ('Should return a modfier based on attribute', (done) => {
        const goodValues = [
            { attr: 0, mod: -2 },
            { attr: 1, mod: -2 },
            { attr: 2, mod: -2 },
            { attr: 3, mod: -2 },
            { attr: 4, mod: -2 },
            { attr: 5, mod: -2 },
            { attr: 6, mod: -2 },
            { attr: 7, mod: -2 },
            { attr: 8, mod: -2 },
            { attr: 9, mod: -1 },
            { attr: 10, mod: -1 },
            { attr: 11, mod: 0 },
            { attr: 12, mod: 0 },
            { attr: 13, mod: 1 },
            { attr: 14, mod: 1 },
            { attr: 15, mod: 1 },
            { attr: 16, mod: 2 },
            { attr: 17, mod: 2 },
            { attr: 18, mod: 2 },
            { attr: 19, mod: 3 },
            { attr: 20, mod: 3 },
        ]

        for (t of goodValues) {
            expect(table(t.attr)).to.be.equals(t.mod)
        }

        done()
    })
})