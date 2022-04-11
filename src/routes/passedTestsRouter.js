const Router = require('express')
const router = new Router()
const passedTestsController = require('../controllers/passedTestsController')

router.get('/', passedTestsController.getAll)
router.get('/:id', passedTestsController.getOne)
router.post('/:id', passedTestsController.addPassed)



module.exports = router