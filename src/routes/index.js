const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const testRouter = require('./testRouter')
const categoryRouter = require('./categoryRouter')
const passedTestsRouter = require('./passedTestsRouter')

router.use('/user', userRouter)
router.use('/test', testRouter)
router.use('/category', categoryRouter)
router.use('/passed', passedTestsRouter)

module.exports = router