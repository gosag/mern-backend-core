import express from 'express';
import router from './routes/posts.js';
import userRouter from "./routes/user.js"
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errors.js';
const app=express();
// to parse the incoming request body as JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//using the logger middleware
app.use(logger);
app.use("/api/posts",router);
app.use("/api/users",userRouter);
//using the error handling middleware
app.use(errorHandler);
//connect to the database
export default app;