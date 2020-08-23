import express from 'express';
import {getAllPosts, getPostById, createPost, deletePost, updatePost} from '../controller/post_controller.js'
import {verifyToken} from '../controller/auth_controller';

const router =express.Router();

router.get('/', getAllPosts);

router.get('/:id',getPostById);

router.post('/',verifyToken, createPost);

router.delete('/:id',verifyToken, deletePost);

router.patch('/:id', verifyToken, updatePost);

export default router;