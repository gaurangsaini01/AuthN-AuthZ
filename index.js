const express = require("express");
const cookieParser = require("cookie-parser")
//instantiating express server
const app = express();

//loading env variables in process object
require("dotenv").config();

const port = process.env.PORT || 2398;

//middleware
app.use(express.json());
app.use(cookieParser());

//app listening on port
app.listen(port,()=>{
    console.log(`App successfully started at PORT ${port}`);
})

//home page route
app.get('/',(req,res)=>{
    res.send('<h1>Hi this is home page</h1>')
}) 
//db connection
const connectWithDb = require("./config/databse.js")
connectWithDb(); 

//importing router
const router = require('./routes/routes.js');

//mounting routes on top of api/v1
app.use('/api/v1',router);