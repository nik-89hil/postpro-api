const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})



//middleware 




const User = mongoose.model('User',userSchema);



module.exports = User;