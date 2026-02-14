import Post from '../models/Post.js';
export const getPosts=async (req,res,next)=>{
    try{
    const limit= Math.min(parseInt(req.query.limit)||10,100)
    const page=Math.max(parseInt(req.query.page)|| 1,1)
    let skip=(page-1)*limit
    const totalItems=await Post.countDocuments()
    const totalPage=Math.ceil(totalItems/limit)
        const DBposts=await Post.find().skip(skip).limit(limit);
        return res.json({
            currentPage:page,
            totalItems,
            totalPage,
            posts:DBposts
        });
    }
    catch(error){
        next(error)
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