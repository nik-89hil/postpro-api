const express = require("express");
const router = express.Router();
const User = require('../models/User');
const {check_password,convert_hash,} = require('./createhash')



router.post("/login",async(req,res)=>{
    const {email,islogin} = req.body;
    const givenpass = req.body.password;

    const find_email = await User.find({email,});
    // console.log(find_email)

    if(find_email.length === 0){
        // console.log("create new account");
        const hash = await convert_hash(givenpass);
        // console.log(hash,"--1");
        const new_user = await User.create({
            email,
            password:hash,
        })

        const result = await new_user.save();
        // console.log(result,"--2 created");
        res.json({
            _id:result._id,
            email:result.email,
            isAdmin:result.isAdmin,
            islogin:true
        })
        res.end();
        return
    }

    const {_id,isAdmin,password} = find_email[0];

    const answer = await check_password(givenpass,password)
    // console.log(answer,"---3")
    if(answer){
        res.json({
            _id,
            email,
            isAdmin,
            islogin:true
        })
        res.end();
        return
    }

    res.json({
        email:"unauthorised",
        islogin:false
    })
    res.end();
    
})







module.exports = router;