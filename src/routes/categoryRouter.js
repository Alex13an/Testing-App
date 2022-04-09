const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRole.middleware')

router.post('/', checkRole('ADMIN'), categoryController.create)
router.get('/', categoryController.getAll)

module.exports = router
