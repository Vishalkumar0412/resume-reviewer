import { Response } from "express";
import { ApiResponse } from "../helper/types/apiResponse";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import pdfParse from "pdf-parse";
import {
  checkResume,
  evaluateResume,
  parseInJSON,
  parseJD,
} from "../utills/ai-setup";

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
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const dataBuffer = response.data;

    // 🔽 Extract PDF text
    const pdfData = await pdfParse(dataBuffer);
    if (pdfData.numpages > 4) {
      return res.status(400).json({
        message: "Resume should be less then 5 pages",
        success: false,
      });
    }

    const isResume = await checkResume(pdfData.text, res);
    if (isResume == "No") {
      return res.status(400).json({
        message: "Uploaeded file is not resume",
        success: false,
      });
    }

    const jsonDATA: any = await parseInJSON(pdfData.text, res);

    const resume = await prisma.resume.create({
      data: {
        fileUrl: fileUrl,
        title: file.originalname,
        content: pdfData.text,
        userId: user.id,
        parsedJSON: jsonDATA,
      },
    });

    return res.status(200).json({
      message: "Resume uploaded and processed successfully",
      success: true,
      data:resume
    });
  } catch (error: any) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      message: "Failed to upload or process resume",
      success: false,
    });
  }
};

export const uploadJD = async (req: any, res: Response<ApiResponse>) => {
  const jd = req.body;

  if (!jd) {
    return res.status(400).json({
      message: "Please Paste JD",
      success: false,
    });
  }

  try {
    const parsedJSON: any = await parseJD(jd, res);

    if (!parsedJSON) {
      return res
        .status(400)
        .json({ message: "JD is not valid", success: false });
    }

    const { company, description, title } = parsedJSON;

    if (!company || !title || !description) {
      return res.status(400).json({
        message: "Invalid JD content",
        success: false,
      });
    }

    const jdRes: any = await prisma.jD.create({
      data: {
        title,
        company,
        description,
        parsedJSON,
      },
    });

    return res.status(200).json({
      message: "Successfully uploaded JD",
      success: true,
      data: jdRes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to parse JD",
      success: false,
      error,
    });
  }
};

export const matchJDToResume = async (req: any, res: Response<ApiResponse>) => {
  const { user } = req;
  const { resumeId, jdId } = req.body;
  console.log(resumeId, jdId, user);

  if (!user || !resumeId || !jdId) {
    return res.status(400).json({
      message: "Missing required fields",
      success: false,
    });
  }
  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    const jd = await prisma.jD.findUnique({
      where: {
        id: jdId,
      },
    });

    if (!resume || !jd) {
      return res.status(400).json({
        message: "Resume or JD not found",
        success: false,
      });
    }

    const result = await evaluateResume(resume.parsedJSON, jd.parsedJSON, res);

    const JDMatch = await prisma.jDMatch.create({
      data: {
        userId: user.id,
        resumeId,
        jdId,

        score: result.score,
        feedback: result.feedback,

        improvements: result.improvement,
        mistakes: result.mistakes,
        spellIssues: result.spellIssues,
        keywordMatch: result.keywordMatch,
        keywordMiss: result.keywordMiss,
        readability: result.readability,
        tone: result.tone,
      },
    });


    return res.status(200).json({
      message:"Resume eveluated successfully",
      success:true,
      data:{JDMatch}
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to evaluate resume",
      success: false,
    });
  }
};


export const getResumes=async(req:any, res:Response<ApiResponse>)=>{
      const userId=req.user.id;
      try {
        const resumes =await prisma.resume.findMany({where:{
          userId
        }})
        if(!resumes){
          return res.status(404).json({
            message:"Resumes not found",
            success:false
          })
        }
        return res.status(200).json({message:"Resumes Fetched successfully",
          success:true,
          data:resumes
        })
      } catch (error) {
        return res.status(500).json({
          message:"Failed to fetch resumes",
          success:false,
          error
        })
      }

}