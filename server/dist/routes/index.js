"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./user.router"));
const resume_router_1 = __importDefault(require("./resume.router"));
const router = express_1.default.Router();
router.use('/user', user_router_1.default);
router.use('/resume', resume_router_1.default);
exports.default = router;
