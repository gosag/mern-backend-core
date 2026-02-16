import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import asyncHandler from "express-async-handler";
const authMiddleware=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.header.authorization.startsWith("Bearel")){
        token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findByid(decoded._id).select("-password")
        next()
    }
    else{
        res.status(400);
        throw new Error("Not authorized, no token")
    }
})