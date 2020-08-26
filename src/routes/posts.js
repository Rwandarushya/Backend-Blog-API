import express from 'express';
import {getAllPosts, getPostById,getComments,addComment, createPost, deletePost, updatePost} from '../controller/post_controller.js'
import {verifyToken, verifyAdmin} from '../controller/auth_controller';

const router =express.Router();

router.get('/', getAllPosts);

router.get('/:id',getPostById);

router.get('/:id/comments', getComments);

router.post('/:id/comments' , verifyToken, addComment);

router.post('/',[verifyToken,verifyAdmin], createPost);

router.delete('/:id',[verifyToken,verifyAdmin], deletePost);

router.patch('/:id', [verifyToken,verifyAdmin], updatePost);

export default router;