import express from 'express';
import {getAllUsers, findUserById,updateUser, deleteUser, registerUser} from '../controller/user_controller.js'

const router= express.Router();

router.get('/',  getAllUsers);

router.get('/:id', findUserById);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/signup', registerUser)

export default router;


