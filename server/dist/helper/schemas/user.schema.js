"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, "Name must be atleast 2 charecter"),
    email: zod_1.default.string().email("Invailed email"),
    password: zod_1.default.string().min(6, "Password Must 6-20 digit long").max(20, "Password Must 6-20 digit long")
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
