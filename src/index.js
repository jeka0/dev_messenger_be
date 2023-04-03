const express = require('express')
const router = require("./routes/router.js")
const bodyParser = require('body-parser')
const { AppDataSource } = require("./repositories/dbAccess.js")
require('dotenv').config()
const {errors} = require('celebrate');
const cors = require('cors');

const app = express()
const PORT = process.env.SERVER_PORT;

app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(bodyParser.json());
app.use('/api', router);
app.use(errors());

AppDataSource.initialize().then(()=>{
    console.log("Database connected successfully");
    app.listen(PORT,()=>console.log(`The server is running on a port ${PORT}...`));
}).catch((err)=>console.log("Database connection error (" + err + ")"));