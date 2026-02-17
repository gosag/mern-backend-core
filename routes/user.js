import User from '../models/UserModel.js';
import {getAllUsers,getUserById,createUser,updateUser,deleteUser,registerUser,loginUser} from "../Controllers/userControllers.js"
import protector from '../middlewares/authMiddleware.js';
import express from "express";
const userRouter=express.Router();
//register user
userRouter.post('/register',registerUser)
//login User
userRouter.post('/login',loginUser)
//get all users
userRouter.get('/',getAllUsers)
//find a user by ID
userRouter.get('/:id',protector,getUserById)
//create a new user
userRouter.post("/",createUser)
//update a user by id
userRouter.put("/:id",protector,updateUser)
//delete a user by id
userRouter.delete('/:id',protector,deleteUser)
export default userRouter;

