import express from 'express';
import {getPosts,getByAuthor,getPostsById,getPostsByUserId,createPost,updatePost,deletePost} from '../Controllers/postControllers.js';
const router=express.Router();
//Get all Posts by skipping some
router.get('/',getPosts);
//Get posts by author query
router.get('/auth',getByAuthor)
//Get a specific post by ID
router.get('/:id',getPostsById);
//Get posts by user id
router.get('/user/:id',getPostsByUserId)
//Create a new post
router.post('/',createPost);
//update a post by ID
router.put('/:id',updatePost);
//delete a post by ID
router.delete('/:id',deletePost);
export default router;