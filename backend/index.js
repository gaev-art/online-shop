require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    )
  } catch (e) {
    console.log('Server Error:', e.message)
    process.exit(1)
  }
}

start().then()

app.get('/', (request, response) =>
  response.send(`<h1 align="center">Hello, it's my server<h1/>`)
)