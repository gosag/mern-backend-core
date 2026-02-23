import app from "./app.js"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
dotenv.config()
const PORT=process.env.PORT ||8000;
const corsOptions={
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
    alowedHeaders:["Content-Types","Authorization"],
    cridentials:true
}
connectDB()
app.use(cors(corsOptions))
//starting the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});