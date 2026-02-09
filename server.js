import express from 'express';
import router from './posts.js';
import logger from './middlewares/logger.js';
const app=express();
const PORT=process.env.PORT ||8000;
// to parse the incoming request body as JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//using the logger middleware
app.use(logger);
//importing the routes
app.use(router);
//starting the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});