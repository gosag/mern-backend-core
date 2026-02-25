import mongoose ,{Document} from "mongoose";
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  id?: string;

}
const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3
    },
   password:{
        type:String,
        required:true,
        min:6
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }
});
const User=mongoose.model<IUser>("User",userSchema);
export default User;