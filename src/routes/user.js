import express from 'express';
import {getAllUsers, findUserById,updateUser, deleteUser} from '../controller/user_controller.js'

const router= express.Router();

router.get('/',  getAllUsers);

router.get('/:id', findUserById);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;


