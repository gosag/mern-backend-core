import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import asyncHandler from "express-async-handler"
const protector=asyncHandler(async(req,res,next)=>{
    let token;
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
        res.status(403);
        throw new Error("not authenticated, no token")
    }
    else{
        token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")
            if (!user) {
                res.status(401)
                throw new Error("User not found")
            }
        req.user = user;
        next();
    }
}) 
export default protector;