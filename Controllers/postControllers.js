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
   const post=await Post.findById(postId);
   if(!post){
       const error=new Error("Post not found");
       error.status=404;
       return next(error)
   }
   res.status(200).json(post)
}
export const getPostsByUserId=async(req,res,next)=>{
    const userId=req.params.id;
    const postsByUser=await Post.find({user:userId}).populate("user");
    res.json(postsByUser)
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
        if(error.name==="ValidationError"){
            error.status=400;
        }
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