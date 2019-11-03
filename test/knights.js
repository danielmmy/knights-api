const { Should } = require('chai')
const request = require('supertest')
const Knight = require('../models/knight')

const app = require('..')

Should()

describe('REST API', () => {
    describe ('Knights', () => {
        const KNIGHT_LINK = {
            name: 'Link',
            nickname: 'The Hero of Time',
            birthday: '1982-09-30',
            gender: 'Mixed',
            attributes:
            {
                strength: 15,
                dexterity: 20,
                constitution: 12,
                intelligence: 14,
                wisdom: 12,
                charisma: 20
            },
            keyAttribute: 'dexterity'
        }
        let KNIGHT_LINK_ID
        
        beforeEach (async () => {
            const knight = await Knight.create(KNIGHT_LINK)
            const KNIGHT_LINK_ID = knight._id
        })
        
        afterEach (async () => {
            await Knight.deleteMany()
        })

        it ('LIST /knights', async () => {
            const res = await request(app).get('/knights')
            const payloadFields = [
                '_id',
                'name',
                'age',
                'weaponsCount',
                'attack',
                'keyAttribute',
                'experience'
            ]
            res.status.should.be.equals(200)
            res.should.have.property('body').that.is.an('object')
            res.body.should.have.property('docs').that.is.an('array').not.length(0)
            res.body.docs[0].should.be.an('object').that.has.all.keys(payloadFields)
        })

        
        it ('GET /knight/:id')
        it ('POST /knight')
        it ('PUT /knight')
        it ('DELETE /knight/:id')
    })

    describe ('Heroes', () => {
        it ('GET /knights?filter=heroes')
    })
})
