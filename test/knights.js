const { Should } = require('chai')
const request = require('supertest')
const Knight = require('../models/knight')
const {Types} = require('mongoose')

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
            KNIGHT_LINK_ID = knight._id
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

        
        it ('GET /knight/:id', async () => {
            const res = await request(app).get(`/knights/${KNIGHT_LINK_ID}`)
            res.status.should.be.equals(200)
            res.should.have.property('body').that.is.an('object')
            res.body.should.have.property('name').equals(KNIGHT_LINK.name)
        })

        it ('POST /knight', async () => {
            const res = await request(app)
                .post('/knights')
                .send(KNIGHT_LINK)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)

            const { _id } = res.body
            const knight = await Knight.findById(_id)
            knight._id.should.be.deep.equals(Types.ObjectId(_id))
            knight.name.should.be.equals(KNIGHT_LINK.name)
        })

        it ('PUT /knight', async () => {
            const body = {
                "attributes.strength": 18
            }
            const res = await request(app)
                .put(`/knights/${KNIGHT_LINK_ID}`)
                .send(body)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            res.body.attributes.strength.should.be.equals(18)
        })

        it ('DELETE /knight/:id')
    })

    describe ('Heroes', () => {
        it ('GET /knights?filter=heroes')
    })
})
