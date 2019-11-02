const { Router } = require('express')
const router = Router()

router.use('/knights', require('./knights'))
router.use('/weapons', require('./weapons'))
module.exports = router