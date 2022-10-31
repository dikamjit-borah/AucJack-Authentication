require('dotenv').config()

const TAG = "server.js"

const express = require('express')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const path = require('path')
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

/* const PROTO_PATH = __dirname + path.join('/', 'services/service.authenticate.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});

const serviceAuthentication = grpc.loadPackageDefinition(packageDefinition)
const grpcServer = new grpc.Server()
grpcServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
 */

app.use(cors())
app.use(express.json())
app.use(routeAuthentication)

app.listen(port, () => {
  basicUtils.logger(TAG, `AucJack-Authentication running on port ${port}`)
  //grpcServer.start()
  if (mongoDbConnection) {
    seedStart.seedStart()
  }
});



