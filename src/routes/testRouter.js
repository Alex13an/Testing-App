const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')
const checkRole = require('../middleware/checkRole.middleware')

router.post('/', checkRole('ADMIN'), testController.create)
router.get('/', testController.getAll)
router.get('/:id', testController.getOne)

module.exports = router
