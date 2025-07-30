import express from 'express'
import userRouter from './user.router'
import ResumeRouter from './resume.router'
const router=express.Router();

router.use('/user',userRouter)
router.use('/resume',ResumeRouter)
export default router;