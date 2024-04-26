const mongoose = require("mongoose")
require("dotenv").config();
const DbUrl = process.env.DATABASE_URL
 function connectWithDb(){
    mongoose.connect(DbUrl)
    .then(()=>console.log("Database Connected Successfully"))
    .catch((error)=>console.log(error))
}
module.exports = connectWithDb;