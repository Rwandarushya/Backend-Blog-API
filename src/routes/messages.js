import express from 'express';
import {getAllMessages,findMessageById,createMessage,deleteMessage,messageFound} from '../controller/message_controller.js'
import {verifyToken,verifyAdmin} from '../controller/auth_controller.js';
const router= express.Router();

router.get('/',[verifyToken,verifyAdmin], getAllMessages);

router.get('/:id',[verifyToken,verifyAdmin], findMessageById);

router.post('/', createMessage); 

router.delete('/:id', [messageFound,verifyToken,verifyAdmin], deleteMessage);

export default router;