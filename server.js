const express = require('express');
const dotenv = require('dotenv').config();

 PORT = process.env.PORT ||5000;

 const app = express();

 app.listen(PORT,()=>{
    console.log(`SERVER RUNNIGN AT ${PORT}`);
    
 })

 app.get('/',(req,res)=>{
   console.log("HOme page");
   res.send("Hello from home page")
 })