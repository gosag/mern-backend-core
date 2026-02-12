import User from '../models/UserModel.js';
import express from "express";
const userRouter=express.Router();
userRouter.get('/',async(req,res,next)=>{
    try{
        const limit=req.query.limit;
        let users;
        if(limit &&!isNaN(limit)){
            users=await User.find().limit(limit)
            res.status(200).json(users)
        }
        else{
            users=await User.find()
            res.json(users) 
        }
           
    }
    catch(error){
        next(error)
    }
    
})
userRouter.post("/",async (req,res,next)=>{
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
        if(error.name==="ValidationError"){
            error.status=400;
        }
        if(error.name === "MongoServerError"){
            error.status=409;
        }
        console.log("ERROR NAME:", error.name);
        console.log(error);
        next(error)
    }
})
userRouter.put("/:id",async(req,res,next)=>{
    const userId=req.params.id;
    const {userName,password,email}=req.body;
    const updateFields={};
    if(userName) updateFields.userName=userName;
    if(password) updateFields.password=password;
    if(email) updateFields.email=email;
    const updatedUser=await User.findByIdAndUpdate(userId,
        updateFields,
        {new:true,runValidators:true}
    )
    if(!updatedUser){
        const error=new Error("User not Found");
        error.status=404;
        return next(error);
    }
    res.json(updatedUser)
})
userRouter.delete('/:id',async(req,res,next)=>{
    const userId=req.params.id;
    const deletedUser=await User.findByIdAndDelete(userId);
    if(!deletedUser){
        const error=new Error(`User with Id of ${userId} is not Found`)
        error.status=404;
        return next(error)
    }
    res.json(deletedUser);
})
export default userRouter;

