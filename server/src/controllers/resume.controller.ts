import { Response } from "express";
import { ApiResponse } from "../helper/types/apiResponse";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const uploadResume = async (req: any, res: Response<ApiResponse>) => {
  const user = req.user;
 
  

  try {
    if (!user) {
      return res.status(401).json({
        message: "Unauthenticated user",
        success: false,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }

    const file = req.file as Express.Multer.File;

    const userId = user.id;

    const resume = await prisma.resume.create({
      data: {
        fileUrl: file.path,
        title: file.originalname,
       userId:user.id
    }
   } );

    return res.status(200).json({
      message: "Resume uploaded successfully",
      success: true,
      data:{resume}
    
    });

  } catch (error: any) {
    

    return res.status(500).json({
      message: "Failed to upload resume",
      success: false,
      
    });
  }
};
export const extractTextFromResume=async(req: any,res: Response)=>{
          const resumeId=req.perams.resumeId;
          
}