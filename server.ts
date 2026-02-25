import app from "./app.ts"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()
const PORT=process.env.PORT ||8000;
connectDB()
//starting the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});