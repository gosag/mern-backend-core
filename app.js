import express from 'express';
import morgan from "morgan"
import cors from "cors"
import compression from "compression"
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
app.use(morgan("dev"))
//to allow only some domains access the api
const corsOptions={
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
    alowedHeaders:["Content-Types","Authorization"],
    cridentials:true
}
app.use(cors(corsOptions))
//to compress and send too large files 
app.use(compression())
//routes
app.use("/api/posts",router);
app.use("/api/users",userRouter);
//use error handling middleware
app.use(errorHandler);
//connect to the database
export default app;