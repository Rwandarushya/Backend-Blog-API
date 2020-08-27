import express from 'express';
import {getAllPosts, getPostById,getComments,addComment,deleteById, createPost, deletePost, updatePost,verifyAuthor} from '../controller/post_controller.js'
import {verifyToken, verifyAdmin} from '../controller/auth_controller';

const router =express.Router();

router.get('/', getAllPosts);

router.get('/:id',getPostById);

router.get('/:id/comments', getComments);

router.post('/:id/comments' , verifyToken, addComment);

router.delete('/:id/comments/:c_id',[verifyToken,verifyAdmin],deleteById)

router.post('/',[verifyToken,verifyAdmin], createPost);

router.delete('/:id',[verifyToken,verifyAdmin,verifyAuthor], deletePost);

router.patch('/:id', [verifyToken,verifyAdmin,verifyAuthor], updatePost);

export default router;