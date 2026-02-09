let posts=[
    { id:1, title:"First Post"},
    { id:2, title:"Second Post"},
    { id:3, title:"Third Post"}
]
export const getPosts=(req,res)=>{
    if(posts.length===0){
        return res.status(404).json({message:"No posts found"});
    }
    res.json(posts);
}
export const getPostsById=(req,res)=>{
    const postId=parseInt(req.params.id)
    if(isNaN(postId) || postId<1 || postId>posts.length){
        return res.status(404).json({message:"Post not found"});
    }
    const post=posts.find(p=>p.id===postId)
    res.json(post);
}
export const createPost=(req,res)=>{
    const newPost={
    id:posts.length+1,
     title:req.body.title
    }
    if(!newPost.title){
        return res.status(400).json({message:"Title is required"});
    }
    posts.push(newPost);
    res.status(201).json(newPost);
}
export const updatePost=(req,res)=>{
    const postId=parseInt(req.params.id)
    const postIndex=posts.findIndex(p=>p.id===postId)
    if(postIndex===-1){
        return res.status(404).json({message:"Post not found"});
    }
    posts[postIndex].title=req.body.title || posts[postIndex].title;
    posts[postIndex].id=postId;
    res.json(posts[postIndex]);
}
export const deletePost=(req,res)=>{
    const postId=parseInt(req.params.id)
    const postIndex=posts.findIndex(p=>p.id===postId)
    if(postIndex===-1){
        return res.status(404).json({message:"Post not found"});
    }
    const nonDeletedPost=posts.filter(post=>post.id!==postId)
    posts=nonDeletedPost;
    res.json({message:"Post deleted successfully"});
}