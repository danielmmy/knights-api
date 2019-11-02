const { Router } = require('express')
const router = Router()

router.use('/knights', require('./knights'))
    
module.exports = router