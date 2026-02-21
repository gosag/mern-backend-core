import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import asyncHandler from "express-async-handler"
const protector=asyncHandler(async(req,res,next)=>{
    let token;
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
        return res.status(403).json({message:"not authenticated, no token"});
    }
    else{
        token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")
            if (!user) {
                return res.status(401).json("User not found")
            }
        req.user = user;
        next();
    }
}) 
export default protector;