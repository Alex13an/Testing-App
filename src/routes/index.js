const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const testRouter = require('./testRouter')
const categoryRouter = require('./categoryRouter')

router.use('/user', userRouter)
router.use('/test', testRouter)
router.use('/category', categoryRouter)

module.exports = router