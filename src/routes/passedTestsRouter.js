const Router = require('express')
const router = new Router()
const passedTestsController = require('../controllers/passedTestsController')

router.post('/', passedTestsController.addPassed)
router.get('/', passedTestsController.getAll)
router.get('/user', passedTestsController.getOne)
router.get('/test', passedTestsController.checkPass)


module.exports = router
