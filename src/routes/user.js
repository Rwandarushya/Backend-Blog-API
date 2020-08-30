import express from 'express';
import {getAllUsers, findUserById,updateUser, deleteUser, userFound} from '../controller/user_controller.js'
import {verifyToken, verifyAdmin} from '../controller/auth_controller.js'
const router= express.Router();

router.get('/',[verifyToken,verifyAdmin],  getAllUsers);

router.get('/:id',[verifyToken,verifyAdmin], findUserById);

router.patch('/:id',[userFound,verifyToken,verifyAdmin], updateUser);

router.delete('/:id',userFound,[verifyToken,verifyAdmin], deleteUser);

export default router;


