const { PassedTests, UserTest } = require('../models/models')
const ApiError = require('../utils/ApiError')

class PassedTestsController {
  async getAll(req, res) {
    let {limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    const passedTests = await PassedTests.findAndCountAll({limit, offset})

    return res.json(passedTests)
  }

  async getOne(req, res) {
    const {id} = req.params
    const passedTest = await PassedTests.findOne(
      {
        where: {id},
        include: [
          {model: UserTest, as: 'userTests'}
        ]
      } 
    )
    return res.json(passedTest)
  }
  
  async addPassed(req, res, next) {
    try {
      let {user, tests} = req.body

      const passedTests = await PassedTests.findOne({
        where: {userId: user}
      })

      if(tests) {
        tests.forEach(i => {
          UserTest.create({
            result: i.result,
            testId: i.testId,
            passedTestId: passedTests.id,
          })
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
