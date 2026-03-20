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
        
        res.status(500).json({
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

        res.cookie('token',token)

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
        
        res.status(500).json({
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
        
        res.status(500).json({
            message:err.message || "Failed to fetch user"
        })
    }
}

async function logout(req,res){
    try{
        const token = req.cookies.token;

        res.clearCookie("token")

        if(token){
            await redis.set(token,Date.now().toString(), "EX", 60 * 60)
        }

        res.status(200).json({
            message : "Logout successfully"
        })
    }catch(err){
        console.error("Logout Error:", err.message)
        res.status(500).json({
            message:err.message || "Logout failed"
        })
    }
}

async function saveSearchHistory(req, res) {
    try {
        const userId = req.user?.id;
        const { query } = req.body;

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        if (!query || query.trim() === "") {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Add search to history (pre-save middleware will limit to 50)
        user.searchHistory.unshift({
            query: query.trim(),
            createdAt: new Date()
        });

        await user.save();

        res.status(200).json({
            message: "Search saved successfully",
            searchHistory: user.searchHistory.slice(0, 10) // Return latest 10
        });
    } catch (err) {
        console.error("Save Search History Error:", err.message);
        res.status(500).json({
            message: err.message || "Failed to save search"
        });
    }
}

async function getSearchHistory(req, res) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Search history retrieved successfully",
            searchHistory: user.searchHistory
        });
    } catch (err) {
        console.error("Get Search History Error:", err.message);
        res.status(500).json({
            message: err.message || "Failed to retrieve search history"
        });
    }
}

async function deleteSearchHistory(req, res) {
    try {
        const userId = req.user?.id;
        const { searchId } = req.params;

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Find and remove the search by ID
        const initialLength = user.searchHistory.length;
        user.searchHistory = user.searchHistory.filter(
            search => search._id.toString() !== searchId
        );

        if (user.searchHistory.length === initialLength) {
            return res.status(404).json({
                message: "Search not found"
            });
        }

        await user.save();

        res.status(200).json({
            message: "Search deleted successfully",
            searchHistory: user.searchHistory
        });
    } catch (err) {
        console.error("Delete Search History Error:", err.message);
        res.status(500).json({
            message: err.message || "Failed to delete search"
        });
    }
}

module.exports = {
    registerUser,
    userLogin,
    getMe,
    logout,
    saveSearchHistory,
    getSearchHistory,
    deleteSearchHistory
}