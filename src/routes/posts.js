import express from 'express';
import {getAllPosts,createPost, getPostById, deletePost, updatePost} from '../controller/post_controller.js'


const router =express.Router();

router.get('/', getAllPosts);

router.post('/', createPost);

router.get('/:id',getPostById);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

export default router;