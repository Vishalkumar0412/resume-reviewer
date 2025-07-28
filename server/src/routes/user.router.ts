import express from 'express'
import { getProfile, loginUser, logout, signupUser } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { matchJDToResume, uploadJD, uploadResume } from '../controllers/resume.controller';
import upload from '../middleware/upload-file';
const router=express.Router();

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/logout',authMiddleware,logout)
router.get('/',authMiddleware, getProfile )
router.post('/upload-resume', authMiddleware, upload.single('file'),uploadResume)
router.post('/upload-jd', authMiddleware,uploadJD)
router.post('/review-resume', authMiddleware,matchJDToResume)

export default router;