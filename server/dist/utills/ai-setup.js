"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateResume = exports.parseJD = exports.parseInJSON = void 0;
exports.checkResume = checkResume;
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
function checkResume(text, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Here is a resume text:\n\n${text}\n\n is it a resume or not give me the one word yes or no only`,
            });
            return response.text;
        }
        catch (error) {
            return res.status(500).json({
                message: "falid to check resume",
                success: false,
                error: error.data.message,
            });
        }
    });
}
const parseInJSON = (text, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Here is a resume text:\n\n${text}\n\n Parse this text into the json return`,
        });
        return response.text;
    }
    catch (error) {
        return res.status(500).json({
            message: "failed to parse",
            success: false,
            error: error.data.message,
        });
    }
});
exports.parseInJSON = parseInJSON;
const parseJD = (text, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        const cleaned = response.text.trim().replace(/^```json\n?|```$/g, "");
        const json = JSON.parse(cleaned); // ensure it's valid JSON
        return json;
    }
    catch (error) {
        console.error("parseJD error:", error);
        return res.status(500).json({
            message: "Failed to parse JD",
            success: false,
            error: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error"
        });
    }
});
exports.parseJD = parseJD;
const evaluateResume = (resume, jd, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        const cleaned = response.text.trim().replace(/^```json\n?|```$/g, "");
        const json = JSON.parse(cleaned);
        return json;
    }
    catch (error) {
        console.error("parseJD error:", error);
        return res.status(500).json({
            message: "Failed to parse JD",
            success: false,
            error: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error"
        });
    }
});
exports.evaluateResume = evaluateResume;
