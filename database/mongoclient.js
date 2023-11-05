const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connect with Database ${connection.connection.host}`)
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        
    }

}
mongoose.set('strictQuery',false);
module.exports = connectDB;