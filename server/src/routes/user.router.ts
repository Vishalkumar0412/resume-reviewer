import express from 'express'
import { getProfile, loginUser, logout, signupUser } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router=express.Router();

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/logout',authMiddleware,logout)
router.get('/',authMiddleware, getProfile )


export default router;