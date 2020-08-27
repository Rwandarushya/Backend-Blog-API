import express from 'express';
import {getAllMessages,findMessageById,createMessage,deleteMessage} from '../controller/message_controller.js'
import {verifyToken,verifyAdmin} from '../controller/auth_controller.js';
const router= express.Router();

router.get('/',[verifyToken,verifyAdmin], getAllMessages);

router.get('/:id',[verifyToken,verifyAdmin], findMessageById);

router.post('/', createMessage); 

router.delete('/:id', [verifyToken,verifyAdmin], deleteMessage);

export default router;