const mongoose = require("mongoose")
const mongo_Connection = "mongodb+srv://kripashankerpandey1503_db_user:Pandey1234@cluster0.ona8dug.mongodb.net/?appName=Cluster0"

const connectDb = async()=>{
  try {
    await mongoose.connect(mongo_Connection)
    console.log("Databae Connected Successfully");
    
  } catch (error) {
    console.log("database could not connect" ,error);
    
  }
}

module.exports = connectDb