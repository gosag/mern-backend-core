import mongoose from "mongoose";
const userSchema= new mongoose.Schema(({
    name:{
        type:String
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        min:3
    },
   password:{
        type:String,
        required:true,
        min:6
    },
    email:{
        type:String,
        required:true
    }
}));
const User=mongoose.model("User",userSchema);
export default User;