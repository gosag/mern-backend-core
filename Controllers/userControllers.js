import User from "../models/UserModel.js";
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
//generate Tokens
console.log("before token")
const generateTokens=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
console.log("after token")
//get all users
export const getAllUsers=async(req,res,next)=>{
  try{
    const limit=Math.min(parseInt(req.query.limit)||10,100);
    const page=Math.max(parseInt(req.query.page)||1,1)
    const skip=(page-1)*limit
    const totalItems=await User.countDocuments()
    const totalPage=Math.ceil(totalItems/limit);
    const users=await User.find().skip(skip).limit(limit);
    res.json({
        currentPage:page,
        totalItems,
        totalPage,
        users
    })
  }
  catch(error){
    console.log(error)
    next(error)
  }
}

//register a new user
export const registerUser=asyncHandler(async (req,res,next)=>{
        const {userName,password,email}=req.body;
        const userExists=await User.findOne({email})
        if(userExists){
            const err=new Error("A user with this email already exists, Hakuna matata")
            err.statusCode=409;
            throw err
        }
        const hash=await bcrypt.hash(password,10);
        const user=new User({
            userName,
            password:hash,
            email
        })
        await user.save()
        res.status(201).json({id:user._id,userName,email,tokens:generateTokens(user._id)})

        })
//login a user

export const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user){
        const err=new Error("user with this email does not exist")
        err.statusCode=400;
        throw err
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        const err=new Error("invalid password");
        err.statusCode=400;
        throw err
    }
    if(user && isMatch){
        res.json({message:"succesfull login",tokens:generateTokens(user._id)})
    }
})
//get a specific user by id
export const getUserById=asyncHandler(async(req,res,next)=>{
        const userId=req.params.id;
         const user=await User.findById(userId);
         if(!user){
            const error=new Error(`a user with Id of ${userId} is nowhere to be found😭`)
            error.status=404;
            return next(error);
         }
         res.json(user); 
})
//create a new user which is not not being used actually
export const createUser=async (req,res,next)=>{
    try{
        const user=new User({
        userName:req.body.userName,
        password:req.body.password,
        email:req.body.email
    })
    await user.save()
    res.status(201).json(user)
    }
    catch(error){
        if(error.name === "MongoServerError"){
            error.status=409;
        }
        next(error)
    }
}
//update a user by their id
export const updateUser=asyncHandler(async(req,res,next)=>{
    const userId=req.params.id;
    const {userName,password,email}=req.body;
    const updateFields={};
    if (userId!==req.user.id){
        const err= new Error("Not authorized to update the user info");
        err.statusCode=403;
        throw err;
    }
    if(userName) updateFields.userName=userName;
    if(password) updateFields.password=password;
    if(email) updateFields.email=email;
    const updatedUser=await User.findByIdAndUpdate(userId,
        updateFields,
        {returnDocument:"after",runValidators:true}
    )
    if(!updatedUser){
        const error=new Error("User not Found");
        error.statusCode=404;
        throw error;
    }
    res.json(updatedUser)
})
//delete a user by his/her id
export const deleteUser=asyncHandler(async(req,res,next)=>{
    const userId=req.params.id;
    if(userId!==req.user.id){
        const error=new Error("not authorized to delete this user")
        error.statusCode=403;
        throw error
    }
    const deletedUser=await User.findByIdAndDelete(userId);
    if(!deletedUser){
        const error=new Error(`User with Id of ${userId} is not Found`)
        error.statusCode=404;
        throw error;
    }
    res.json(deletedUser);
})