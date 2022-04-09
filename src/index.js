require('dotenv').config()
const express = require('express')
const sequelize = require('./db/db')
const cors = require('cors')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandling = require('./middleware/ErrorHandling.middleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandling)

app.get('/', (req, res) => {
  res.status(200).json({message: 'FUCK YOU!'})
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
