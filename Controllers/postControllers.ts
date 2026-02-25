import Post from '../models/Post.js';
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose"
interface GetPostsQuery{
    limit?:string,
    page?:string
}
 interface RequestError extends Error{
            status?:number
         }
export const getPosts=async ( 
  req: Request<{}, {}, {}, GetPostsQuery>,
  res: Response,
  next: NextFunction)=>{
    try{
    const limit= Math.min(parseInt(req.query.limit ?? "10"),100)
    const page=Math.max(parseInt(req.query.page?? "1"),1)
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
interface getByAuthorQuery{
    user?:string
}
export const getByAuthor=async(req:Request<{},{},{},getByAuthorQuery>,
    res:Response,
    next:NextFunction
)=>{
    try{    
        const query:getByAuthorQuery={}
        if(req.query.user){
            if(!mongoose.Types.ObjectId.isValid(req.query.user)){
                const error= new Error("Invalid author Id") as RequestError
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
interface paramsInterface{
    id?:string
}
export const getPostsById=async (
    req:Request<paramsInterface,{},{},{}>,
    res:Response,
    next:NextFunction
)=>{
   const postId=req.params.id;
   const post=await Post.findById(postId);
   if(!post){
       const error=new Error("Post not found") as RequestError;
       error.status=404;
       return next(error)
   }
   res.status(200).json(post)
}

export const getPostsByUserId=async(req:Request<paramsInterface,{},{},{}>,res:Response,next:NextFunction)=>{
    try{
         const userId=req.params.id;
         const postsByUserId=await Post.find({user:userId as any}).populate("user","userName email");
         if(!postsByUserId){
            const error=new Error("Posts under this user is is not found") as RequestError;
            error.status=404;
            return next(error)
         }
         res.json(postsByUserId)
    }
    catch(err){
        next(err)
    }
   
}
export const createPost=async (req:Request,res:Response,next:NextFunction)=>{
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
export const updatePost=async (req:Request,res:Response,next:NextFunction)=>{
    const postId=req.params.id;
    const post=await Post.findByIdAndUpdate(postId,{title:req.body.title},{ returnDocument: 'after' } )
    if(!post){
        const error=new Error("Post not found") as RequestError;
        error.status=404;
        return next(error);
    }
    res.json(post);
}
export const deletePost=async (req:Request,res:Response,next:NextFunction)=>{
    const postId=req.params.id;
    const post=await Post.findByIdAndDelete(postId)
    if(!post){
        const error=new Error("Post not found") as RequestError;
        error.status=404;
        return next(error);
    }
    res.json({message:"Post deleted successfully"});
}


