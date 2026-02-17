import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import asyncHandler from "express-async-handler"
const protector=asyncHandler(async(req,res,next)=>{
    let token;
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
        res.status(403);
        throw new Error("Unauthorized access, no token")
    }
    else{
        token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const userFound=await User.findById(decoded.id).select("-password");
        if(!userFound){
            res.status(404);
            throw new Error("user is not found")
        }
        req.user=userFound;
        next();
    }
})
export default protector;