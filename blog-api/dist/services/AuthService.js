"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    async login(username, password) {
        const user = await prisma_1.default.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
        const payload = {
            id: user.id,
            username: user.username,
        };
        const token = jsonwebtoken_1.default.sign(payload, jwtSecret);
        return token;
    }
}
exports.AuthService = AuthService;
