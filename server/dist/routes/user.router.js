"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/signup', user_controller_1.signupUser);
router.post('/login', user_controller_1.loginUser);
router.post('/logout', auth_middleware_1.authMiddleware, user_controller_1.logout);
router.get('/', auth_middleware_1.authMiddleware, user_controller_1.getProfile);
exports.default = router;
