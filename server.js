import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/posts.js';
import userRouter from "./routes/user.js"
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errors.js';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
const app=express();
const PORT=process.env.PORT ||8000;
// to parse the incoming request body as JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//using the logger middleware
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger);
//main page route
/* const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
router.use(express.static(path.join(__dirname,'public'))); */
//importing the routes
app.use("/api/posts",router);
app.use("/api/users",userRouter);
//using the error handling middleware
app.use(errorHandler);
//connect to the database
connectDB();
//starting the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});