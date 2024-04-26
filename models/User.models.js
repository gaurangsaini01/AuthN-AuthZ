const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true // removes leading whitespaces from front and then stores to the database
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","student"],
        default:"student"
    }
})
module.exports = mongoose.model("User",userSchema);