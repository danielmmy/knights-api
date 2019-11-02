const { Router } = require('express')

const bodyParser = require('../lib/body-parser')
const debug = require('../lib/debug')('routes:knights')
const controller = require('../controllers/knights')

const router = Router()


router.route('/')
    .get(controller.list)
    .post(bodyParser, controller.insert)


router.route('/:id')
    .get(controller.findById)
    .put(bodyParser, controller.update)
    .delete(controller.delete)
    
module.exports = router