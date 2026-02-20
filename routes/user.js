import {getAllUsers,getUserById,createUser,updateUser,deleteUser,registerUser,loginUser} from "../Controllers/userControllers.js"
import protector from '../middlewares/authMiddleware.js';
import {userBodySchema,loginSchema,userQuerySchema,mongoIdSchema} from '../models/userSchema.js';
import validate from '../middlewares/validate.js';
import express from "express";
const userRouter=express.Router();
userRouter.post('/register',validate(userBodySchema,"body"),registerUser)
//login User
userRouter.post('/login',validate(loginSchema,"body"),loginUser)
//get all users
userRouter.get('/',getAllUsers)
//find a user by ID
userRouter.get('/:id',protector,validate(mongoIdSchema,"params"),getUserById)
//create a new user
userRouter.post("/",validate(userBodySchema,"body"),createUser)
//update a user by id
userRouter.put("/:id",protector,validate(mongoIdSchema.partial(),"params"),updateUser)
//delete a user by id
userRouter.delete('/:id',protector,validate(mongoIdSchema,"params"),deleteUser)
export default userRouter;

