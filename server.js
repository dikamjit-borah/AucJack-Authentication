require('dotenv').config()

const TAG = "server.js"

const express = require('express')
const cors = require('cors');

const basicUtils = require('./utils/basic.utils');
const constants = require('./utils/constants');
const app = express()

const port = process.env.PORT || 5051;
var corsOptions = {
  origin: `${process.env.HOST}:${port}`,
};

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  basicUtils.logger(TAG, `AucJack-Authentication running on port ${port}`)
});

