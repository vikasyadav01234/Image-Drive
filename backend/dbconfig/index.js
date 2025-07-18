import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
//require('dotenv').config();
const connectDB = async ()=>{
    try{
        if(!process.env.MONGODB_URI){
            throw new Error("Please define the MONGODB_URI environment variable inside .env");
        }
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB Connected");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDB;