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

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"3d"}
    )

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:3*24*60*60*1000
    })

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}
    catch(err){
        res.status(500).json({message:err.message})
    }
}

async function userLogin(req,res) {
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

    res.cookie('token',token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function getMe(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message : "User Fetched Suucessfully",
        user
    })
}

async function logout(req,res){
    const token = req.cookies.token;

    res.clearCookie("token")

    await redis.set(token,Date.now().toString(), "EX", 60 * 60)

    res.status(200).json({
        message : "Logout Successfully"
    })
}

module.exports = {
    registerUser,
    userLogin,
    getMe,
    logout
}