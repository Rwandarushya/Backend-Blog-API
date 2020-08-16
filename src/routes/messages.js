import express from 'express';
import {getAllMessages,findMessageById,createMessage,deleteMessage} from '../controller/message_controller.js'

const router= express.Router();

router.get('/', getAllMessages);

router.get('/:id', findMessageById);

 router.post('/', createMessage); 

 router.delete('/:id', deleteMessage);

export default router;