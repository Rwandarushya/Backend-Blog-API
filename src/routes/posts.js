import express from 'express';
import {getAllPosts, getPostById, createPost,postFound, deletePost, updatePost} from '../controller/post_controller.js'
import {getAllComments,addComment,deleteById} from '../controller/comment_controller.js'
import {verifyToken, verifyAdmin} from '../controller/auth_controller';

const router =express.Router();

router.get('/', getAllPosts);

router.get('/:id',[postFound],getPostById);

router.get('/:id/comments', getAllComments);

router.post('/:id/comments' , verifyToken, addComment);

router.delete('/:id/comments/:c_id',[verifyToken,verifyAdmin],deleteById)

router.post('/',[verifyToken,verifyAdmin], createPost);

router.delete('/:id',[postFound,verifyToken,verifyAdmin], deletePost);

router.patch('/:id', [verifyToken,verifyAdmin], updatePost);

export default router;