const mongoose = require("mongoose")
const schema = mongoose.Schema

const UserSchema = new schema({
    fullName : {type : String},
    email : {type : String , unique : true},
    password : {type : String},
    createdOn : {type : Date, default: new Date().getTime()}
})

module.exports=mongoose.model("User", UserSchema)