let posts=[
    { id:1, title:"First Post"},
    { id:2, title:"Second Post"},
    { id:3, title:"Third Post"}
]
export const getPosts=(req,res,next)=>{
    if(posts.length===0){
        const error=new Error("No posts found");
        error.status=404;
        return next(error);
    }
    res.json(posts);
}
export const getPostsById=(req,res,next)=>{
    const postId=parseInt(req.params.id)
    const post=posts.find(p=>p.id===postId)
    if(!post){
        const error=new Error("Post not found");
        error.status=404;
        return next(error);
    }
    res.json(post);
}
export const createPost=(req,res,next)=>{
    const newPost={
    id:posts.length+1,
     title:req.body.title
    }
    if(!newPost.title){
        const error=new Error("Title is required");
        error.status=400;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(newPost);
}
export const updatePost=(req,res,next)=>{
    const postId=parseInt(req.params.id)
    const post=posts.find(p=>p.id===postId)
    if(!post){
        const error=new Error("Post not found");
        error.status=404;
        return next(error);
    }
    const postIndex=posts.findIndex(p=>p.id===postId)
    posts[postIndex].title=req.body.title || posts[postIndex].title;
    posts[postIndex].id=postId;
    res.json(posts[postIndex]);
}
export const deletePost=(req,res,next)=>{
    const postId=parseInt(req.params.id)
    const post=posts.find(p=>p.id===postId)
    if(!post){
        const error=new Error("Post not found");
        error.status=404;
        return next(error);
    }
    const nonDeletedPost=posts.filter(post=>post.id!==postId)
    posts=nonDeletedPost;
    res.json({message:"Post deleted successfully"});
}