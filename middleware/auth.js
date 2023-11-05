const {getMongoConnection} = require('../database/connection')


async function checkhash(req,res,next){
    const name = req.cookies.name
    const client = getMongoConnection();
    await client.connect();
    const collection = await client.db("database").collection("users");
    const result = await collection.find({name,}).toArray();
    if(name == result.name){
        next();
    }
    res.send("something unexpected happen")
}


module.exports = {checkhash };