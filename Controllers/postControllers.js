import Post from '../models/Post.js';
import mongoose from "mongoose"
export const getPosts=async (req,res,next)=>{
    try{
    const limit= Math.min(parseInt(req.query.limit)||10,100)
    const page=Math.max(parseInt(req.query.page)|| 1,1)
    const  skip=(page-1)*limit
    const totalItems=await Post.countDocuments()
    const totalPage=Math.ceil(totalItems/limit)
    const DBposts=await Post.find().skip(skip).limit(limit);
        return res.json({
            currentPage:page,
            totalPage,
            totalItems,
            posts:DBposts
        });
    }
    catch(error){
        next(error)
    }
    
}
export const getByAuthor=async(req,res,next)=>{
    try{
        const query={}
        if(req.query.user){
            if(!mongoose.Types.ObjectId.isValid(req.query.user)){
                const error= new Error("Invalid author Id")
                error.status=400;
                return next(error)
            }
            query.user=req.query.user
        }
        const postsByAuthor=await Post.find(query)
        res.json(postsByAuthor)
    }
    catch(err){
        next(err);
    }
    
}
export const getPostsById=async (req,res,next)=>{
   const postId=req.params.id;
   const post=await Post.findById(postId);
   if(!post){
       const error=new Error("Post not found");
       error.status=404;
       return next(error)
   }
   res.status(200).json(post)
}
export const getPostsByUserId=async(req,res,next)=>{
    try{
         const userId=req.params.id;
         const postsByUserId=await Post.find({user:userId}).populate("user","userName email");
         if(!postsByUserId){
            const error=new Error("Posts under this user is is not found");
            error.status=404;
            return next(error)
         }
         res.json(postsByUserId)
    }
    catch(err){
        next(err)
    }
   
}
export const createPost=async (req,res,next)=>{
    try{
        const newPost=new Post({
            title:req.body.title,
            user:req.body.user
        });
        await newPost.save()
        res.status(201).json(newPost);
    }
    catch(error){
        next(error);
    }
}
export const updatePost=async (req,res,next)=>{
    const postId=req.params.id;
    const post=await Post.findByIdAndUpdate(postId,{title:req.body.title},{ returnDocument: 'after' } )
    if(!post){
        const error=new Error("Post not found");
        error.status=404;
        return next(error);
    }
    res.json(post);
}
export const deletePost=async (req,res,next)=>{
    const postId=req.params.id;
    const post=await Post.findByIdAndDelete(postId)
    if(!post){
        const error=new Error("Post not found");
        error.status=404;
        return next(error);
    }
    res.json({message:"Post deleted successfully"});
}
const hashed_Pasword=await bcrypt.hash(password,10)
const user=new Post({
    password:hashed
})
const isMatch=await bcrypt.compare(password,user.password)

