import { Response } from "express";
import { ApiResponse } from "../helper/types/apiResponse";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import pdfParse from "pdf-parse";
import { checkResume } from "../utills/ai-setup";

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
    const fileUrl = file.path; // This is Cloudinary URL

    // 🔽 Download the file buffer from Cloudinary
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const dataBuffer = response.data;

    // 🔽 Extract PDF text
    const pdfData = await pdfParse(dataBuffer);
    if(pdfData.numpages>4){
      return res.status(400).json({
        message:"Resume should be less then 5 pages",
        success:false
      })
    }

     const isResume=await checkResume(pdfData.text,res)
     if(isResume=="No"){
      return res.status(400).json({
        message:"Uploaeded file is not resume",
        success:false
      })
     }
     
    const resume = await prisma.resume.create({
      data: {
        fileUrl: fileUrl,
        title: file.originalname,
        content: pdfData.text,
        userId: user.id,
      }
    });

    return res.status(200).json({
      message: "Resume uploaded and processed successfully",
      success: true,
      data: { resume }
    });

  } catch (error: any) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      message: "Failed to upload or process resume",
      success: false,
    });
  }
};
