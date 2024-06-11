import express from 'express';
import { test, updateUser, deleteUser } from '../controllers/user_control.js';
import { verifyToken } from '../utlis/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)

export default router;