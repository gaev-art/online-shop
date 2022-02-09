require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path')


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/auth', require('./routes/auth.routes'))

const PORT = process.env.PORT
const PROD = process.env.NODE_ENV
const URL = process.env.MONGO_URL

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

start().then()

app.get('/', (request, response) =>
  response.send(`<h1 align="center">Hello, it's my server<h1/>`)
)