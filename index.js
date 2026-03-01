import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routers/StudentRouter.js";
import userRouter from "./routers/userRouter.js";
import authentication from "./middleweres/authentication.js";
import productRouter from "./routers/productRouter.js";


const app = express();
  
const mongodbURI= "mongodb+srv://admin:1234@cluster0.yfn2xjj.mongodb.net/icomputer?appName=Cluster0"


mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("Conected to MongoDB");
    }
);

app.use(express.json()); //midle were pluged

app.use(authentication)

app.use("/students" , studentRouter)
app.use("/users" , userRouter)
app.use("/products" ,productRouter )
 


app.listen(3000, (req , res)=>  
    { 
        console.log("Server is running on port 3000 "); 
    
    });
