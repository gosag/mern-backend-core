import type {Request,Response,NextFunction} from "express"
import User from "../models/UserModel.js";
import type { ParamsDictionary } from 'express-serve-static-core';
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import { loginSchema } from "../models/userSchema.js";
import z from "zod"
import type { Types } from "mongoose";
type LoginBody = z.infer<typeof loginSchema>
//generate Tokens
const secret = process.env.JWT_SECRET || "fallback_secret";
const generateTokens=(id:Types.ObjectId)=>{
    return jwt.sign({id:id.toString()},secret,{expiresIn:'30d'})
}
//get all users
interface getUsersQuers{
    limit?:string,
    page?:string
}
interface requestBody{
    userName?:string,
    password?:string,
    email?:string
}
interface requestParams extends ParamsDictionary{
    id:string;
}
export const getAllUsers=async(req:Request<{},{},{},getUsersQuers>,res:Response,next:NextFunction)=>{
  try{
    const limit=Math.min(parseInt(req.query.limit??"10"),100);
    const page=Math.max(parseInt(req.query.page??"1"),1)
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
interface RequestError extends Error{
    status?:number,
    statusCode?:number
}
export const registerUser=asyncHandler(async (req:Request<{},{},requestBody,{}>,res:Response):Promise<void>=>{
        const {userName,password,email}=req.body;
        const userExists=await User.findOne({email:email as any})
        if(userExists){
            const err=new Error("A user with this email already exists, Hakuna matata") as RequestError
            err.statusCode=409;
            throw err
        }
        const hashPassord:string=password || "new password";
        const hash=await bcrypt.hash(hashPassord,10);
        const user=new User({
            userName,
            password:hash,
            email
        })
        await user.save()
        res.status(201).json({id:user._id,userName,email,tokens:generateTokens(user._id)})

        })
//login a user

export const loginUser=asyncHandler(async (req:Request<{},{},LoginBody>,res:Response)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email as any})
    if(!user){
        const err=new Error("user with this email does not exist") as RequestError
        err.statusCode=400;
        throw err
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        const err=new Error("invalid password") as RequestError;
        err.statusCode=400;
        throw err
    }
    if(user && isMatch){
        res.json({message:"succesfull login",tokens:generateTokens(user._id)})
    }
})
//get a specific user by id
export const getUserById=asyncHandler(async(req:Request<requestParams,{},{},{}>,res:Response,next:NextFunction)=>{
        const userId=req.params.id;
         const user=await User.findById(userId);
         if(!user){
            const error=new Error(`a user with Id of ${userId} is nowhere to be found😭`) as RequestError;
            error.status=404;
            return next(error);
         }
         res.json(user); 
})
//create a new user which is not not being used actually

export const createUser=async (req:Request<{},{},requestBody,{}>,res:Response,next:NextFunction)=>{
    try{
        const user=new User({
        userName:req.body.userName,
        password:req.body.password,
        email:req.body.email
    })
    await user.save()
    res.status(201).json(user)
    }
    catch(error:any){
        if(error.name === "MongoServerError"){
            error.status=409 ;
        }
        next(error)
    }
}
//update a user by their id
export const updateUser=asyncHandler(async(req:Request<requestParams,{},requestBody,{}>,res:Response)=>{
    const userId=req.params.id;
    const {userName,password,email}=req.body;
    interface fieldsType{
        userName?:string,
        password?:string,
        email?:string
    }
    const updateFields:fieldsType={};
    if (userId!==req.user?.id){
        const err= new Error("Not authorized to update the user info") as RequestError;
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
        const error=new Error("User not Found") as RequestError;
        error.statusCode=404;
        throw error;
    }
    res.json(updatedUser)
})
//delete a user by his/her id
export const deleteUser=asyncHandler(async(req:Request,res:Response)=>{
    const userId=req.params.id;
    if(userId!==req.user?.id){
        const error=new Error("not authorized to delete this user") as RequestError
        error.statusCode=403;
        throw error
    }
    const deletedUser=await User.findByIdAndDelete(userId);
    if(!deletedUser){
        const error=new Error(`User with Id of ${userId} is not Found`) as RequestError;
        error.statusCode=404;
        throw error;
    }
    res.json(deletedUser);
})