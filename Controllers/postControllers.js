import Post from '../models/Post.js';
export const getPosts=async (req,res,next)=>{
    const limit=parseInt(req.query.limit)
        if(limit && !isNaN(limit)){
            const DBposts= await Post.find().limit(limit);
            return res.json(DBposts);
        }
    const DBposts= await Post.find();
    res.json(DBposts);
}
export const getPostsById=async (req,res,next)=>{
    const postId=req.params.id;
    const post=await Post.findById(postId)
    if(!post){
        const error=new Error("Post not found");
        error.status=404;
        return next(error);
    }
    res.json(post);
}
export const createPost=async (req,res,next)=>{
    const newPost=new Post({
        title:req.body.title
    });
    if(!req.body.title){
        const error=new Error("Title is required");
        error.status=400;
        return next(error);
    }
    await newPost.save();
    res.status(201).json(newPost);
}
export const updatePost=async (req,res,next)=>{
    const postId=req.params.id;
    const post=await Post.findByIdAndUpdate(postId,{title:req.body.title})
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