import express from 'express'

import { authMiddleware } from '../middleware/auth.middleware';
import { fetchJDMatches, fetchJDS, getResumes, matchJDToResume, uploadJD, uploadResume } from '../controllers/resume.controller';
import upload from '../middleware/upload-file';
const router=express.Router();

router.post('/upload-resume', authMiddleware, upload.single('file'),uploadResume)
router.post('/upload-jd', authMiddleware,uploadJD)
router.post('/review-resume', authMiddleware,matchJDToResume)
router.get('/',authMiddleware,getResumes)
router.get('/get-jds',authMiddleware,fetchJDS)
router.get('/get-reports',authMiddleware,fetchJDMatches)
export default router;