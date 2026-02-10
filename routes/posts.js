import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {getPosts,getPostsById,createPost,updatePost,deletePost} from '../Controllers/postControllers.js';
const router=express.Router();
//main page route
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
router.use(express.static(path.join(__dirname,'public')));
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