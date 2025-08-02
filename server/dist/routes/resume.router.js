"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const resume_controller_1 = require("../controllers/resume.controller");
const upload_file_1 = __importDefault(require("../middleware/upload-file"));
const router = express_1.default.Router();
router.post('/upload-resume', auth_middleware_1.authMiddleware, upload_file_1.default.single('file'), resume_controller_1.uploadResume);
router.post('/upload-jd', auth_middleware_1.authMiddleware, resume_controller_1.uploadJD);
router.post('/review-resume', auth_middleware_1.authMiddleware, resume_controller_1.matchJDToResume);
router.get('/', auth_middleware_1.authMiddleware, resume_controller_1.getResumes);
router.get('/get-jds', auth_middleware_1.authMiddleware, resume_controller_1.fetchJDS);
router.get('/get-reports', auth_middleware_1.authMiddleware, resume_controller_1.fetchJDMatches);
exports.default = router;
