const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const check_password = async function(pass,hash){
    const result = await bcrypt.compare(pass,hash)
    return result;
}


const convert_hash = async function (pass){
    const result = await bcrypt.hash(pass,10);
    return result;
}

const generate_token = async function(email){
    const token = jwt.sign({
        email:email
    },process.env.MY_JWT_SECRET,
    { expiresIn: '2h' })
    return token;
}

module.exports = {
    check_password,
    convert_hash,
    generate_token,
}
