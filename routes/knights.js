const { Router } = require('express')

const bodyParser = require('../lib/body-parser')
const debug = require('../lib/debug')('routes:knights')
const knight = require('../controllers/knights')

const router = Router()


router.route('/')
    .get(knight.list)
    .post(bodyParser, knight.insert)


router.route('/:id')
    .get(knight.findById)
    .put(bodyParser, knight.update)
    .patch(bodyParser, knight.updateNickname)
    .delete(knight.delete)

router.route('/:id/died').patch(knight.softDelete)

router.route('/:id/weapons')
    .get(knight.weapons)
    .post(bodyParser,knight.addToInventory)

router.route('/:id/weapons/equip')
    .patch(bodyParser, knight.equip)

module.exports = router