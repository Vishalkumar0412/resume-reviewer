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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJDMatches = exports.fetchJDS = exports.getResumes = exports.matchJDToResume = exports.uploadJD = exports.uploadResume = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const ai_setup_1 = require("../utills/ai-setup");
const prisma = new client_1.PrismaClient();
const uploadResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user.id;
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
        const resumes = yield prisma.resume.findMany({ where: {
                userId
            } });
        if (resumes.length > 5) {
            return res.status(400).json({
                message: "Resume upload limit is 5 exceed delete one of them",
                success: false
            });
        }
        const file = req.file;
        const fileUrl = file.path; // This is Cloudinary URL
        // 🔽 Download the file buffer from Cloudinary
        const response = yield axios_1.default.get(fileUrl, { responseType: "arraybuffer" });
        const dataBuffer = response.data;
        // 🔽 Extract PDF text
        const pdfData = yield (0, pdf_parse_1.default)(dataBuffer);
        if (pdfData.numpages > 4) {
            return res.status(400).json({
                message: "Resume should be less then 5 pages",
                success: false,
            });
        }
        const isResume = yield (0, ai_setup_1.checkResume)(pdfData.text, res);
        if (isResume == "No") {
            return res.status(400).json({
                message: "Uploaeded file is not resume",
                success: false,
            });
        }
        const jsonDATA = yield (0, ai_setup_1.parseInJSON)(pdfData.text, res);
        const resume = yield prisma.resume.create({
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
            data: resume
        });
    }
    catch (error) {
        console.error("Resume upload error:", error);
        return res.status(500).json({
            message: "Failed to upload or process resume",
            success: false,
        });
    }
});
exports.uploadResume = uploadResume;
const uploadJD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jd = req.body;
    const userId = req.user.id;
    if (!jd) {
        return res.status(400).json({
            message: "Please Paste JD",
            success: false,
        });
    }
    try {
        const parsedJSON = yield (0, ai_setup_1.parseJD)(jd, res);
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
        const jdRes = yield prisma.jD.create({
            data: {
                title,
                userId,
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to parse JD",
            success: false,
            error,
        });
    }
});
exports.uploadJD = uploadJD;
const matchJDToResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const resume = yield prisma.resume.findUnique({ where: { id: resumeId } });
        const jd = yield prisma.jD.findUnique({
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
        const result = yield (0, ai_setup_1.evaluateResume)(resume.parsedJSON, jd.parsedJSON, res);
        const JDMatch = yield prisma.jDMatch.create({
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
            message: "Resume eveluated successfully",
            success: true,
            data: { JDMatch }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to evaluate resume",
            success: false,
        });
    }
});
exports.matchJDToResume = matchJDToResume;
const getResumes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const resumes = yield prisma.resume.findMany({ where: {
                userId
            } });
        if (!resumes) {
            return res.status(404).json({
                message: "Resumes not found",
                success: false
            });
        }
        return res.status(200).json({ message: "Resumes Fetched successfully",
            success: true,
            data: resumes
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch resumes",
            success: false,
            error
        });
    }
});
exports.getResumes = getResumes;
const fetchJDS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "user not authonticated"
        });
    }
    try {
        const jds = yield prisma.jD.findMany({
            where: {
                userId: userId
            }
        });
        if (!jds) {
            return res.status(404).json({
                success: false,
                message: "jds not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "jds fetched successfully",
            data: jds
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "jds can't fetched"
        });
    }
});
exports.fetchJDS = fetchJDS;
const fetchJDMatches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({
            message: "User is not authonticated",
            success: false
        });
    }
    try {
        const jDMatchs = yield prisma.jDMatch.findMany({
            where: {
                userId
            },
            include: {
                resume: {
                    select: { title: true }
                },
                jd: {
                    select: { title: true }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        if (!jDMatchs) {
            return res.status(400).json({
                message: "No report found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Reports fetched successfully",
            success: true,
            data: jDMatchs
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetched Reports",
            success: false,
            error
        });
    }
});
exports.fetchJDMatches = fetchJDMatches;
