require('dotenv').config()

const TAG = "server.js"

const express = require('express')
const cors = require('cors');

const basicUtils = require('./utils/basic.utils');
const seedStart = require('./helpers/seed.start');
const routeAuthentication = require('./routes/route.authentication')
const app = express()
const mongoDbConnection = require('./modules/mongodb/mongodb.connect')()

global.mongoDbConnection = mongoDbConnection

const port = process.env.PORT || 5051;
var corsOptions = {
  origin: `${process.env.HOST}:${port}`,
};

app.use(cors())
app.use(express.json())
app.use(routeAuthentication)

app.listen(port, () => {
  basicUtils.logger(TAG, `AucJack-Authentication running on port ${port}`)
  if (mongoDbConnection) {
    seedStart.seedStart()
  }
});



