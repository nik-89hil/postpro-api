const mongoose = require("mongoose");


const postschema = mongoose.Schema({
    title:{
        type:String,
    },
    intro:{
        type:String,
    },
    summary:{
        type:String,
    },
    conc:{
        type:String,
    },

    tags:[String],
    author:{
        type:String,
    },
    imgarr:[String],
    dateofpost:{
        type:Date,
        default: Date.now(),
    },

 
},{timestamps:true})


const Post = mongoose.model('Post',postschema);


module.exports = Post;