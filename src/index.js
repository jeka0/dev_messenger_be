var express = require('express');
const server = require('./additionalServers/socketServer');
const router = require("./routes/router.js");
const bodyParser = require('body-parser');
const { AppDataSource } = require("./repositories/dbAccess.js")
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const SERVER_PORT = process.env.SERVER_PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;

var app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use('/api', router);
app.use(errors());

AppDataSource.initialize().then(()=>{
  console.log("Database connected successfully");
  server.listen(SOCKET_PORT, ()=>console.log(`The socket server is running on a port ${SOCKET_PORT}...`));
  app.listen(SERVER_PORT,()=>console.log(`The server is running on a port ${SERVER_PORT}...`));
}).catch((err)=>console.log("Database connection error (" + err + ")"));