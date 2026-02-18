import {getAllUsers,getUserById,createUser,updateUser,deleteUser,registerUser,loginUser} from "../Controllers/userControllers.js"
import protector from '../middlewares/authMiddleware.js';
import {userBodySchema,userQueryschema} from '../models/userSchema.js';
import validate from '../middlewares/validate.js';
import express from "express";
const userRouter=express.Router();
//register user
userRouter.post('/register',validate(userBodySchema,"body"),registerUser)
//login User
userRouter.post('/login',validate(userBodySchema,"body"),loginUser)
//get all users
userRouter.get('/',validate(userQueryschema,"query"),getAllUsers)
//find a user by ID
userRouter.get('/:id',protector,getUserById)
//create a new user
userRouter.post("/",validate(userBodySchema,"body"),createUser)
//update a user by id
userRouter.put("/:id",protector,validate(userBodySchema.partial(),"body"),updateUser)
//delete a user by id
userRouter.delete('/:id',protector,deleteUser)
export default userRouter;

