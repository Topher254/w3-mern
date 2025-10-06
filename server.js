const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/productModel')



 PORT = process.env.PORT ||5000;

 const app = express();

//  middleware to enebale on use jsons
app.use(express.json());

 app.listen(PORT,()=>{
    console.log(`SERVER RUNNIGN AT ${PORT}`);
    
 })

 app.get('/',(req,res)=>{
   console.log("HOme page");
   res.send("Hello from home page")
   
 })
//  post

 app.post("/api/products", async (req,res)=>{
   try {
     const product = await Product.create(req.body)
     res.status(200).json(product)
     console.log(req.body);
     
      
   } catch (error) {
      res.status(500).json({"message":"error"})
      
   };
   

 })


 //get them
 app.get("/api/products",async(req,res)=>{
   try {
      const products = await Product.find({});
      res.status(200).json(products)
      
   } catch (error) {
      res.status(500).json({"message":"error"})
      
   }
 })


//  GET ONE PRODUCT
app.get("/api/products/:id",async(req,res)=>{
   try {
      const{id} = req.params;
     const product = await Product.findById(id);
      res.status(200).json(product)
   } catch (error) {
      res.status(500).json({"message":error.message})
   }
})

// ds a productelete
app.delete("/api/products/:id",async(req,res)=>{
   try {
      const{id} = req.params;
     const product = await Product.deleteById(id);
      res.status(200).json(product)
   } catch (error) {
      res.status(500).json({"message":error.message})
   }
})

// update a products
app.put("/api/product/:id",async(req,res)=>{
   try {
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id,req.body)
       if(!product){
         return res.status(404).json({"message":"product not found"})
       }
       await Product.findById(id);
       const updatedProduct = await Product.findById(id);
       res.status(200).json(updatedProduct)
      
   } catch (error) {
      res.status(500).json({"message":error.message})
   }
})


//  connecting to db
const connectToDb = async()=>{
   try{
      await mongoose.connect(process.env.MONGODB_URI,{
         useNewUrlParser:true,
         useUnifiedTopology:true,
      })
      console.log("CONNECTED TO DB ...");
      
   }
   catch(error){
console.log("ERROR CONNECTING TO DB:",error.message);
process.exit(1)

   }
}

connectToDb();