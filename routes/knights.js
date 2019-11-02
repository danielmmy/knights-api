const { Router } = require('express')

const debug = require('../lib/debug')('routes:knights')

const router = Router()

router.route('/')
    .get((req, res) => {
        return res.json({ foo: 'bar' })
    })

module.exports = router