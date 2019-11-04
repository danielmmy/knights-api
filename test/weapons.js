const { Should, expect } = require('chai')
const request = require('supertest')

const Weapon = require('../models/weapon')
const app = require('..')

Should()

describe('REST API', () => {
    describe ('Weapons', () => {
        const WEAPON_LONGBOW = {
                "name": "LongBow",
                "mod": 3,
                "attr": "Dexterity"
        }
        let WEAPON_LONGBOW_ID
        
        
        beforeEach (async () => {
            const weapon = await Weapon.create(WEAPON_LONGBOW)
            WEAPON_LONGBOW_ID = weapon._id
        })
        
        afterEach (async () => {
            await Weapon.deleteMany()
        })

        it ('LIST /weapons', async () => {
            const res = await request(app).get('/weapons')
            res.status.should.be.equals(200)
            res.should.have.property('body').that.is.an('object')
            res.body.should.have.property('docs').that.is.an('array').not.length(0)
            res.body.docs[0].should.be.an('object').that.has.property("_id").equals(`${WEAPON_LONGBOW_ID}`)
        })
    })
})
