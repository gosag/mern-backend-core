import express from 'express';
const router=express.Router();
let posts=[
    { id:1, title:"First Post"},
    { id:2, title:"Second Post"},
    { id:3, title:"Third Post"}
]
//Get all posts
router.get('/',(req,res)=>{
    res.json({message:"Welcome to the Posts API"});
})
router.get('/posts',(req,res)=>{
    res.json(posts);
});
//Get a specific post by ID
router.get('/posts/:id',(req,res)=>{
    const postId=parseInt(req.params.id)
    if(isNaN(postId) || postId<1 || postId>posts.length){
        return res.status(404).json({message:"Post not found"});
    }
    const post=posts.find(p=>p.id===postId)
    res.json(post);
})
//Create a new post
router.post('/posts',(req,res)=>{
    const newPost={
    id:posts.length+1,
     title:req.body.title
    }
    if(!newPost.title){
        return res.status(400).json({message:"Title is required"});
    }
    posts.push(newPost);
    res.status(201).json(newPost);
})
//update a post by ID
router.put('/posts/:id',(req,res)=>{
    const postId=parseInt(req.params.id)
    const postIndex=posts.findIndex(p=>p.id===postId)
    if(postIndex===-1){
        return res.status(404).json({message:"Post not found"});
    }
    posts[postIndex].title=req.body.title || posts[postIndex].title;
    posts[postIndex].id=postId;
    res.json(posts[postIndex]);
})
//delete a post by ID
router.delete('/posts/:id',(req,res)=>{
    const postId=parseInt(req.params.id)
    const postIndex=posts.findIndex(p=>p.id===postId)
    if(postIndex===-1){
        return res.status(404).json({message:"Post not found"});
    }
    const nonDeletedPost=posts.filter(post=>post.id!==postId)
    posts=nonDeletedPost;
    res.json({message:"Post deleted successfully"});
})
export default router;