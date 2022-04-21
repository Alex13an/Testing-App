const { Test, Question, Result } = require('../models/models')
const ApiError = require('../utils/ApiError')
const { Op } = require('sequelize')

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
    let {categoryId, sort, sortType, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let tests
    if(!categoryId && !sort) {
      tests = await Test.findAndCountAll({limit, offset})
    } else if (categoryId && !sort){
      tests = await Test.findAndCountAll({where: {categoryId}, limit, offset})
    } else if (!categoryId && sort) {
      tests = await Test.findAndCountAll({limit, offset, order: [
        [sort, sortType],
      ]})
    } else {
      tests = await Test.findAndCountAll({where: {categoryId}, limit, offset, order: [
        [sort, sortType],
      ]})
    }
    const totalTests = await Test.count()

    return res.json({...tests, total: totalTests / limit})
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

  async getSearched(req, res, next) {
    try {
      let {searchValue, limit} = req.query
      const tests = await Test.findAll({where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${searchValue}%`
            }
          },
          {
            title: {
              [Op.match]: `%${searchValue}%`
            }
          },
        ]
      }, attributes: [
        'id', 'title'
      ], limit})

      return res.json(tests)
    } catch (err) {

      next(ApiError.badRequest(err.message))
    }
  }
}

module.exports = new TestController()
