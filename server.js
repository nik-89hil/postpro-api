const express = require("express");
const app = express();
const PORT = 8080;
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const user = require('./routes/user')
const databaseConnection = require('./database/mongoclient');
const postrouter = require("./routes/post");




//// ---------------------------------------- middleware
app.use(express.json());      
app.use(cookieParser());
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();

});
app.use("/getimage",express.static('upload/'));

// -------------------------------------- routers
app.use("/user",user)
// require('./database/googleauth');
app.use("/post",postrouter)
databaseConnection()


/// ------------------------------------- home routes

app.get("/",(req,res)=>{              
    res.json({
        message:"this is home route",
        success:true
    })
    res.end();
})

app.post("/",(req,res)=>{              
    res.json({
        message:"this is home route",
        success:true,
        data:req.body,
        id:"789555652332"
    })
    res.end();
})

app.get("/reached",(req,res)=>{              
    res.json({
        message:"this is reached route",
        success:true
    })
    res.end();
})

app.get("*",(req,res)=>{
    res.json({
        message:"page is not found",
        error:"404"
    })
})

app.use((error,req,res,next)=>{
    res.json({
        success:false,
        message:error?.message
    })

    next();
})


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})