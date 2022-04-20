require('dotenv').config()
const express = require('express')
const sequelize = require('./db/db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandling = require('./middleware/ErrorHandling.middleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static(path.join(__dirname, '../client/build')))

app.use(errorHandling)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'))
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server is listening port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()
