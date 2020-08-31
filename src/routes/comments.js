import express from 'express';
import {getAllComments,addComment,deleteById, postFound, commentFound} from '../controller/comment_controller.js'
import {verifyToken, verifyAdmin} from '../controller/auth_controller';

const router =express.Router();


router.get('/:id',postFound, getAllComments);

router.post('/:id' ,postFound, verifyToken, addComment);

router.delete('/:id',[commentFound,verifyToken,verifyAdmin],deleteById)


export default router;