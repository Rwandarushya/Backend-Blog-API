import express from 'express';
import {signup, login, checkDuplicate} from '../controller/auth_controller.js'

const router = express.Router();

router.post('/signup',checkDuplicate, signup)
router.post('/login', login);

export default router;