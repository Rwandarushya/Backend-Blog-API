import express from 'express';
import {getAllUsers, findUserById,updateUser, deleteUser, registerUser} from '../controller/user_controller.js'
import {verifyToken, verifyAdmin} from '../controller/auth_controller.js'
const router= express.Router();

router.get('/',[verifyToken,verifyAdmin],  getAllUsers);

router.get('/:id',[verifyToken,verifyAdmin], findUserById);

router.patch('/:id',[verifyToken,verifyAdmin], updateUser);

router.delete('/:id',[verifyToken,verifyAdmin], deleteUser);

export default router;


