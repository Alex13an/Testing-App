const { Sequelize } = require('sequelize')

const devConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}

module.exports = new Sequelize(devConfig)
