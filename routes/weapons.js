const { Router } = require('express')

const bodyParser = require('../lib/body-parser')
const debug = require('../lib/debug')('routes:weapons')
const controller = require('../controllers/weapons')

const router = Router()


router.route('/')
    .get(controller.list)
    .post(bodyParser, controller.insert)

router.route('/:id')
    .delete(controller.delete)

module.exports = router