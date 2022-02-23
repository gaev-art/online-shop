require('dotenv').config()
require('./services/passport')
const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT
const PROD = process.env.NODE_ENV
const URL = process.env.MONGO_URL

const app = express()
app.use(bodyParser.json())

app.use(
  cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
)

const start = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully!')
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    )
  } catch (e) {
    console.log('Server Error:', e.message)
    process.exit(1)
  }
}

if (PROD === 'production') {
  app.use(express.static(path.join(__dirname, '../build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
  })
}

app.use('/', require('./routes/auth.routes'))

start().then()
