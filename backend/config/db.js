const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Databae Connected Successfully");
    
  } catch (error) {
    console.log("database could not connect" ,error);
    
  }
}

module.exports = connectDb