const Router = require('express')
const router = new Router()
const passedTestsController = require('../controllers/passedTestsController')

router.post('/', passedTestsController.addPassed)
router.get('/', passedTestsController.getAll)
router.get('/:id', passedTestsController.getOne)



module.exports = router
