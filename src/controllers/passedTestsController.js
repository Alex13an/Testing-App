const { PassedTests, UserTest, Test, Result } = require('../models/models')
const ApiError = require('../utils/ApiError')
const jwt = require('jsonwebtoken')

const getResult = (currentScore, results) => {
  let breachResult = ''
  results.forEach(result => {
    if (currentScore >= result.breach) {
      breachResult = result.body
    }
  })
  if (!breachResult) breachResult = results[0].body

  return breachResult
}

class PassedTestsController {
  async getAll(req, res, next) {
    try {
      let {userId} = req.query
      const tests = await Test.findAll({include: [
        {model: Result, as: 'results'}
      ]})
      const testsId = await PassedTests.findOne({where: {userId}})
      const passedTests = await UserTest.findAll({where: {passedTestId: testsId.id}})


      const resTests = [] 

      tests.forEach(test => {
        if(passedTests.some(t => t.testId === test.id)) {
          const res = passedTests.find(p => p.testId === test.id).result
          resTests.push({
            testId: test.id,
            categoryId: test.categoryId,
            title: test.title,
            description: test.description,
            result: getResult(res, test.results)
          })
        }
      })

      return res.json(resTests)
    } catch (err) {
      next(ApiError.badRequest(err.message))
    }
  }

  async getOne(req, res) {
    const {userId} = req.query
    const passedTest = await PassedTests.findOne(
      {
        where: {userId},
        include: [
          {model: UserTest, as: 'userTests'}
        ]
      } 
    )
    return res.json(passedTest)
  }

  async checkPass(req, res, next) {
    try {
      const {userId, testId} = req.query
      const passedTest = await PassedTests.findOne({where: {userId}})
      const pass = await UserTest.findOne({where: {passedTestId: passedTest.id, testId}})
      if(pass) {
        return res.json({check: true, result: pass.result})
      } else {
        return res.json({check: false, result: 0})
      }
    } catch (err) {
      next(ApiError.badRequest(err.message))
    }
  }
  
  async addPassed(req, res, next) {
    try {
      let {user, test} = req.body
      const token = req.headers.authorization.split(' ')[1]
      if(!token) {
        return res.status(401).json({message: 'User is not authorized!'})
      }
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      if(decoded.id !== user) return res.status(401).json({message: 'User id not equeal to token.userId'})

      const passedTests = await PassedTests.findOne({
        where: {userId: user}
      })

      if(test) {
        const already = await UserTest.findOne({where: {testId: test.testId, passedTestId: passedTests.id}})
        if(already) return next(ApiError.badRequest('User already has passed this test!'))

        UserTest.create({
          result: test.result,
          testId: test.testId,
          passedTestId: passedTests.id,
        })
      }

      return res.json({
        success: true
      })
    } catch(err) {
      next(ApiError.badRequest(err.message))
    }
  }
}

module.exports = new PassedTestsController()
