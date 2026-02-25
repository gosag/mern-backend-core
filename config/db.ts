import mongoose from 'mongoose';
const connectDB= async (): Promise<void>=>{
    const mongoURI=process.env.MONGO_URI
    if(!mongoURI){
        throw new Error("MONGO_URI is not defined in environment variables");
    }
    try{
        await mongoose.connect(mongoURI!);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log("Error connecting to MongoDB",error);
    }
}
export default connectDB;