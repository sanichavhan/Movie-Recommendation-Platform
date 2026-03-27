const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require('../config/cache')

async function registerUser(req,res){
    try{
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const isUserAlreadyRegister = await userModel.findOne({
            $or:[
                {email},
                {username}
            ]
        })

        if(isUserAlreadyRegister){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const user = await userModel.create({
            username,
            email,
            password
        })

        const token = jwt.sign(
            {
                id:user._id,
                username:user.username
            },
            process.env.JWT_SECRET,
            {expiresIn:"3d"}
        )

        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("token",token,{
            httpOnly:true,
            secure:isProduction,
            sameSite:'lax',
            maxAge:3*24*60*60*1000,
            path:'/'
        })

        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })

    }catch(err){
        console.error("Register Error:", err)
        console.error("Error message:", err.message)
        
        // Handle SSL/TLS errors
        if(err.message.includes("SSL") || err.message.includes("ssl") || err.message.includes("tls")){
            return res.status(503).json({
                message:"SSL/TLS connection error. Database service unreachable. Please try again later."
            })
        }
        
        if(err.message.includes("buffering timed out") || err.message.includes("timeout") || err.message.includes("ECONNREFUSED")){
            return res.status(503).json({
                message:"Database service temporarily unavailable. Please try again later."
            })
        }
        
        if(err.code === 11000){
            return res.status(400).json({
                message:"Email or username already exists"
            })
        }
        
        return res.status(500).json({
            message:err.message || "Registration failed"
        })
    }
}
async function userLogin(req,res) {
    try{
        const {username,email,password} = req.body

        const user =  await userModel.findOne({
            $or :[
                {email},
                {username},
            ]
        }).select('+password')

        if(!user){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        } 

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            {
                id : user._id,
                username : user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "3d"
            }
        )

        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('token',token,{
            httpOnly:true,
            secure:isProduction,
            sameSite:'strict',
            maxAge:3*24*60*60*1000,
            path:'/'
        })

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }catch(err){
        console.error("Login Error:", err)
        console.error("Error message:", err.message)
        
        // Handle SSL/TLS errors
        if(err.message.includes("SSL") || err.message.includes("ssl") || err.message.includes("tls")){
            return res.status(503).json({
                message:"SSL/TLS connection error. Database service unreachable. Please try again later."
            })
        }
        
        // Handle timeout errors
        if(err.message.includes("buffering timed out") || err.message.includes("timeout") || err.message.includes("ECONNREFUSED")){
            return res.status(503).json({
                message:"Database service temporarily unavailable. Please try again later."
            })
        }
        
        return res.status(500).json({
            message:err.message || "Login failed"
        })
    }
}

async function getMe(req,res){
    try{
        const user = await userModel.findById(req.user.id)

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message : "User fetched successfully",
            user
        })
    }catch(err){
        console.error("GetMe Error:", err.message)
        
        if(err.message.includes("buffering timed out") || err.message.includes("timeout")){
            return res.status(503).json({
                message:"Database service temporarily unavailable. Please try again later."
            })
        }
        
        return res.status(500).json({
            message:err.message || "Failed to fetch user"
        })
    }
}

async function logout(req,res){
    try{
        const token = req.cookies.token;

        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie("token",{
            httpOnly:true,
            secure:isProduction,
            sameSite:'lax',
            path:'/'
        })

        if(token){
            await redis.set(token,Date.now().toString(), "EX", 60 * 60)
        }

        res.status(200).json({
            message : "Logout successfully"
        })
    }catch(err){
        console.error("Logout Error:", err.message)
        return res.status(500).json({
            message:err.message || "Logout failed"
        })
    }
}



module.exports = {
    registerUser,
    userLogin,
    getMe,
    logout
}