const { Router } = require('express')

const debug = require('../lib/debug')('routes:knights')
const controller = require('../controllers/knights')

const router = Router()


router.route('/')
    .get(controller.list)

module.exports = router