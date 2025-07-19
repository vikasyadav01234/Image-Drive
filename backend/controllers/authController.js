import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const signup = async (req,res)=>{
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            console.log("Error: Missing fields in signup request");
            return res.status(400).json({err:"Please Fill All Fields"});
        }
        const existinguser = await User.find({email});
        if(existinguser.length > 0){
            return res.status(400).json({err:"User Already Exists"});
        }
        const hashed = await bcrypt.hash(password, 10);
        if(!hashed){
            return res.status(500).json({err:"Error in Hashing Password"});
        }
        const user = new User({
            username,
            email,
            password:hashed
        });
        await user.save();
        return res.status(200).json({
            message:"User Created Successfully",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }catch(err){
        console.log(err.message);
        res.status(500).json({err:"Internal Server Error"});
    }
}

const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({err:"Please Fill All Fields"});
        }
        const user = await User.find({email});
        if(user.length === 0){
            return res.status(400).json({err:"User Not Found Register First Then Try To Login Again"});
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if(!isMatch){
            return res.status(400).json({err:"Invalid Credentials"});
        }

        const token = jwt.sign({id: user[0]._id}, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        return res.status(200).json({
            message:"User Logged In Successfully",
            user:{
                id: user[0]._id,
                username: user[0].username,
                email: user[0].email
            },
            token
        });


    }catch(err){
        console.log(err.message);
        res.status(500).json({
            error:"Internal Server Error",
            message: err.message
        })
    }
}

export {signup, login};