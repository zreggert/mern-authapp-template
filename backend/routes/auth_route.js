import express from 'express';
import { login, signup, google, signout } from '../controllers/auth_control.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/google', google)
router.get('/signout', signout)


export default router;