const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')
const { databaseVersion } = require('../db/db')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const PassedTests = sequelize.define('passed_tests', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
})

const UserTest = sequelize.define('user_test', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  result: {type: DataTypes.INTEGER, allowNull: false}
})

const Test = sequelize.define('test', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.TEXT},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const Question = sequelize.define('question', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  body: {type: DataTypes.STRING, allowNull: false},
  scale: {type: DataTypes.INTEGER, defaultValue: 1}
})

const Result = sequelize.define('result', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  body: {type: DataTypes.STRING, allowNull: false},
  breach: {type: DataTypes.INTEGER, allowNull: false}
})

User.hasOne(PassedTests)
PassedTests.belongsTo(User)

PassedTests.hasMany(UserTest, {as: 'userTests'})
UserTest.belongsTo(PassedTests)

Test.hasOne(UserTest)
UserTest.belongsTo(Test)

Category.hasMany(Test)
Test.belongsTo(Category)

Test.hasMany(Question, {as: 'questions'})
Question.belongsTo(Test)

Test.hasMany(Result, {as: 'results'})
Result.belongsTo(Test)

module.exports = {
  User, 
  PassedTests,
  UserTest,
  Test,
  Category, 
  Question,
  Result
}