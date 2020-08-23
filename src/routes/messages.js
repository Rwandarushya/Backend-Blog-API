import express from 'express';
import {getAllMessages,findMessageById,createMessage,deleteMessage} from '../controller/message_controller.js'
import {verifyToken} from '../controller/auth_controller.js';
const router= express.Router();

router.get('/', getAllMessages);

router.get('/:id', findMessageById);

 router.post('/', createMessage); 

 router.delete('/:id', verifyToken, deleteMessage);

export default router;