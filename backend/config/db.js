const mongoose = require("mongoose")

const connectDb = async()=>{
  try {
    await mongoose.connect("mongodb://localhost:27017/notesApp")
    console.log("Databae Connected Successfully");
    
  } catch (error) {
    console.log("database could not connect" ,error);
    
  }
}

module.exports = connectDb