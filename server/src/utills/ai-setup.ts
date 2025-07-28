import { GoogleGenAI } from "@google/genai";
import { Response } from "express";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function checkResume(text:string,res:Response) {
  try {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:  `Here is a resume text:\n\n${text}\n\n is it a resume or not give me the one word yes or no only`,
  });
  return response.text;
  } catch (error:any) {
    return res.status(500).json({
        message:"falid to check resume",
        success:false,
        error:error.data.message
        
    })
  }
}

