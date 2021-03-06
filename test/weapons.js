const { Should, expect } = require('chai')
const request = require('supertest')
const {Types} = require('mongoose')

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

        it ('POST /weapons', async () => {
            const res = await request(app)
                .post('/weapons')
                .send(WEAPON_LONGBOW)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
            const { _id } = res.body
            const weapon = await Weapon.findById(_id)
            weapon._id.should.be.deep.equals(Types.ObjectId(_id))
            weapon.name.should.be.equals(WEAPON_LONGBOW.name)
        })

        it ('DELETE /weapons/:id', async () => {
            const res = await request(app)
                .delete(`/weapons/${WEAPON_LONGBOW_ID}`)
                .expect(204)
            const weapon = await Weapon.findById(WEAPON_LONGBOW_ID)
            expect(weapon).to.be.equal(null)
        })
    })
})
