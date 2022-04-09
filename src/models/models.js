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
})

const Test = sequelize.define('test', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.STRING},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
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

PassedTests.hasMany(UserTest)
UserTest.belongsTo(PassedTests)

UserTest.hasOne(Test)
Test.belongsTo(UserTest)

Category.hasMany(Test)
Test.belongsTo(Category)

Test.hasMany(Question)
Question.belongsTo(Test)

Test.hasMany(Result)
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