import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import type { Request, Response, NextFunction } from "express";
interface JwtPayload {
    id: string;
}
const protector =async (req:Request, res:Response,next:NextFunction) => {
try{
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(403).json({ message: "not authenticated, no token" });
  }

  const token = req.headers.authorization.split(" ")[1]!;
  const secret = process.env.JWT_SECRET!;
  const decoded = jwt.verify(token, secret) as JwtPayload;

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user;
  next();
}catch(error){
    next(error)
}};
export default protector;