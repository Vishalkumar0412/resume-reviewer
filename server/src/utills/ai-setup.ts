import { GoogleGenAI } from "@google/genai";
import { Response } from "express";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function checkResume(text: string, res: Response) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Here is a resume text:\n\n${text}\n\n is it a resume or not give me the one word yes or no only`,
    });
    return response.text;
  } catch (error: any) {
    return res.status(500).json({
      message: "falid to check resume",
      success: false,
      error: error.data.message,
    });
  }
}
export const parseInJSON = async (text: string, res: Response) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Here is a resume text:\n\n${text}\n\n Parse this text into the json return`,
    });
    return response.text;
  } catch (error: any) {
    return res.status(500).json({
      message: "failed to parse",
      success: false,
      error: error.data.message,
    });
  }
};
export const parseJD = async (text: string, res: Response) => {
  try {
    const prompt = `
Extract the following fields from the given job description:

- company
- title
- description (as a single plain text string)

Return only a valid JSON object in this format:

{
  "company": "Company Name",
  "title": "Job Title",
  "description": "Full plain text description"
}

Do not include any extra text, explanation, or markdown. Here is the JD:

${text}
`;

    const response : any = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const cleaned = response.text.trim().replace(/^```json\n?|```$/g, "");
    const json = JSON.parse(cleaned); // ensure it's valid JSON

    return json;
  } catch (error: any) {
    console.error("parseJD error:", error);
    return res.status(500).json({
      message: "Failed to parse JD",
      success: false,
      error: error?.message || "Unknown error"
    });
  }
};
export const evaluateResume = async (resume:any,jd:any,res:Response) => {
  try {
   const prompt = `
You are an expert resume and job description evaluator.

Based on the following Job Description and Resume, evaluate the alignment and return a structured JSON with the following fields:

{
  "score": Float between 0 to 100,
  "feedback": String summary about overall match quality,
  "improvements": [String],  // Resume improvement suggestions
  "mistakes": [String],      // Grammar or formatting mistakes
  "spellIssues": [String],   // Spelling errors
  "keywordMatch": [String],  // Keywords from JD that were found in resume
  "keywordMiss": [String],   // Important keywords from JD missing in resume
  "readability": String,     // One of: "Excellent", "Good", "Needs Improvement", "Poor"
  "tone": String             // One of: "Professional", "Neutral", "Too Casual", "Inconsistent"
}

Use only JSON and no extra explanation.

### Job Description:
${jd}

### Resume:
${resume}
`;

    const response : any = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const cleaned = response.text.trim().replace(/^```json\n?|```$/g, "");
    const json = JSON.parse(cleaned); 

    return json;
  } catch (error: any) {
    console.error("parseJD error:", error);
    return res.status(500).json({
      message: "Failed to parse JD",
      success: false,
      error: error?.message || "Unknown error"
    });
  }
};



