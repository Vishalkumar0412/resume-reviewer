import { Response } from "express";
import { ApiResponse } from "../helper/types/apiResponse";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import upload from "../middleware/upload-file";

export const uploadResume = async (req: any, res: Response<ApiResponse>) => {
  const user: any = req.user;
  try {
    if (!user) {
      return res.status(400).json({
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
    res.json({
      message: "File uploaded successfully",
      success: true,
      data: {
        url: file.path,
        filename: file.filename,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to upload resume",
      success: false,
      error: error.data.message,
    });
  }
};
