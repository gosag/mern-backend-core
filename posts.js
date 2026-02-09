import express from 'express';
import {getPosts,getPostsById,createPost,updatePost,deletePost} from './Controllers/postControllers.js';
const router=express.Router();

//Get all posts
router.get('/posts',getPosts);
//Get a specific post by ID
router.get('/posts/:id',getPostsById);
//Create a new post
router.post('/posts',createPost);
//update a post by ID
router.put('/posts/:id',updatePost);
//delete a post by ID
router.delete('/posts/:id',deletePost);
export default router;