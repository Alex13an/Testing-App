const { Test, Question, Result } = require('../models/models')
const ApiError = require('../utils/ApiError')

class TestController {
  async create(req, res, next) {
    try {
      let {title, description, categoryId, questions, results} = req.body

      const test = await Test.create({
        title, 
        description, 
        categoryId
      })

      if(questions) {
        questions.forEach(i => {
          Question.create({
            body: i.body,
            scale: i.scale,
            testId: test.id
          })
        })
      }

      if(results) {
        results.forEach(i => {
          Result.create({
            body: i.body,
            breach: i.breach,
            testId: test.id
          })
        })
      }

      return res.json(test)
    } catch(err) {
      next(ApiError.badRequest(err.message))
    }
  }

  async addContent(req, res, next) {
    try {
      let {id, questions, results} = req.body

      const test = await Test.findOne({where: {id}})
      if(!test) return

      if(questions) {
        questions.forEach(i => {
          Question.create({
            body: i.body,
            scale: i.scale,
            testId: test.id
          })
        })
      }

      if(results) {
        results.forEach(i => {
          Result.create({
            body: i.body,
            breach: i.breach,
            testId: test.id
          })
        })
      }

      return res.json({questions, results})
    } catch(err) {
      next(ApiError.badRequest(err.message))
    }
  }

  async getAll(req, res) {
    let {categoryId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let tests
    if(!categoryId) {
      tests = await Test.findAndCountAll({limit, offset})
    } else {
      tests = await Test.findAndCountAll({where: {categoryId}, limit, offset})
    }

    return res.json(tests)
  }

  async getOne(req, res) {
    const {id} = req.params
    const test = await Test.findOne(
      {
        where: {id},
        include: [
          {model: Question, as: 'questions'},
          {model: Result, as: 'results'}
        ]
      } 
    )
    return res.json(test)
  }
}

module.exports = new TestController()
