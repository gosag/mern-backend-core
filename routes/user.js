import {getAllUsers,getUserById,createUser,updateUser,deleteUser,registerUser,loginUser} from "../Controllers/userControllers.js"
import protector from '../middlewares/authMiddleware.js';
import {userBodySchema,loginSchema,userQueryschema,mongoIdSchema} from '../models/userSchema.js';
import validate from '../middlewares/validate.js';
import express from "express";
const userRouter=express.Router();
//register user
/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user and return an authentication token
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *               - email
 *             properties:
 *               userName:
 *                 type: string
 *                 minLength: 3
 *                 example: gosa123
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: strongPassword123
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
userRouter.post('/register',validate(userBodySchema,"body"),registerUser)
//login User
userRouter.post('/login',validate(loginSchema,"body"),loginUser)
//get all users
userRouter.get('/',validate(userQueryschema,"query"),getAllUsers)
//find a user by ID
userRouter.get('/:id',protector,validate(mongoIdSchema,"params"),getUserById)
//create a new user
userRouter.post("/",validate(userBodySchema,"body"),createUser)
//update a user by id
userRouter.put("/:id",protector,validate(mongoIdSchema.partial(),"params"),updateUser)
//delete a user by id
userRouter.delete('/:id',protector,validate(mongoIdSchema,"params"),deleteUser)
export default userRouter;

