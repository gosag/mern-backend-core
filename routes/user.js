import User from '../models/UserModel.js';
import {getAllUsers,getUserById,createUser,updateUser,deleteUser} from "../Controllers/userControllers.js"
import express from "express";
const userRouter=express.Router();
//get all users
userRouter.get('/',getAllUsers)
//find a user by ID
userRouter.get('/:id',getUserById)
//create a new user
userRouter.post("/",createUser)
//update a user by id
userRouter.put("/:id",updateUser)
//delete a user by id
userRouter.delete('/:id',deleteUser)
export default userRouter;

