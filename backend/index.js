require("dotenv").config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require("./config/db")
const path = require("path");
app.use(express.json())
app.use(cookieParser())

connectDb()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))


// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/notes', require('./routes/noteRoute'))


 const PORT = process.env.PORT || 3000
app.listen(PORT,(err)=>{
    if(err){
        console.log("Server Error" , err);
        
    }
    console.log(`Server Running On :http://localhost:${PORT}` );
    
})