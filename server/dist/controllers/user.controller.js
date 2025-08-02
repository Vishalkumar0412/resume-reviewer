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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.logout = exports.loginUser = exports.signupUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("../helper/schemas/user.schema");
const genrateToken_1 = require("../utills/genrateToken");
const prisma = new client_1.PrismaClient();
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const parsed = user_schema_1.signupSchema.safeParse(userData);
    console.log(parsed.error);
    if (parsed.error) {
        return res.status(400).json({
            success: false,
            message: "validation error",
            error: parsed.error
        });
    }
    const { name, email, password } = parsed.data;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User is already exist",
                error: "User is already exist"
            });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        yield prisma.user.create({ data: {
                email,
                password: hashPassword,
                name
            } });
        return res.status(200).json({
            success: true,
            message: "User signup successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User can't signup",
            error: error
        });
    }
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const parsed = user_schema_1.loginSchema.safeParse(userData);
    if (parsed.error) {
        return res.status(400).json({ message: "Validation error", success: false, error: parsed.error });
    }
    try {
        const { email, password } = parsed.data;
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({
                message: "Email or password invalid",
                success: false
            });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Email or password invalid",
                success: false
            });
        }
        (0, genrateToken_1.genrateToken)(res, user, ` welcome back ${user.name}`);
    }
    catch (error) {
        return res.status(500).json({ message: "User can't login", error: error.message, success: false });
    }
});
exports.loginUser = loginUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logout successfully",
            success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to logout",
            success: false
        });
    }
});
exports.logout = logout;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }
        const { password } = user, safeUser = __rest(user, ["password"]);
        return res.status(200).json({
            message: "User fetched",
            success: true,
            user: safeUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
            error: error.message,
        });
    }
});
exports.getProfile = getProfile;
