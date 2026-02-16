import User from "../models/UserModel.js";
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
export const registerUser=(req,res,next)=>{
    res.json({message:"user Registered"})
}
export const getUserById=async(req,res,next)=>{
        try{
        const userId=req.params.id;
         const user=await User.findById(userId);
         if(!user){
            const error=new Error(`a user with Id of ${userId} is nowhere to be found😭`)
            error.status=404;
            return next(error);
         }
         res.json(user); 
        }
        catch(error){
                next(error)
        }
}
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
export const updateUser=async(req,res,next)=>{
    const userId=req.params.id;
    const {userName,password,email}=req.body;
    const updateFields={};
    if(userName) updateFields.userName=userName;
    if(password) updateFields.password=password;
    if(email) updateFields.email=email;
    const updatedUser=await User.findByIdAndUpdate(userId,
        updateFields,
        {returnDocument:"after",runValidators:true}
    )
    if(!updatedUser){
        const error=new Error("User not Found");
        error.status=404;
        return next(error);
    }
    res.json(updatedUser)
}
export const deleteUser=async(req,res,next)=>{
    const userId=req.params.id;
    const deletedUser=await User.findByIdAndDelete(userId);
    if(!deletedUser){
        const error=new Error(`User with Id of ${userId} is not Found`)
        error.status=404;
        return next(error)
    }
    res.json(deletedUser);
}