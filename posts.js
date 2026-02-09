import express from 'express';
import {getPosts,getPostsById,createPost,updatePost,deletePost} from './Controllers/postControllers.js';
const router=express.Router();
//main page route
router.get('/',(req,res)=>{
    res.send('<h1>Welcome to the Posts API</h1>');
})
//Get all posts
router.get('/api/posts',getPosts);
//Get a specific post by ID
router.get('/api/posts/:id',getPostsById);
//Create a new post
router.post('/api/posts',createPost);
//update a post by ID
router.put('/api/posts/:id',updatePost);
//delete a post by ID
router.delete('/api/posts/:id',deletePost);
export default router;