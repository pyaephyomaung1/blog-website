"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to protect routes by verifying a JWT.
 * Ensures that only authenticated users (admin) can access certain endpoints.
 */
const authenticateToken = (req, res, next) => {
    // 1. Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    // Token format: "Bearer YOUR_JWT_TOKEN"
    const token = authHeader && authHeader.split(' ')[1]; // Get the token part after "Bearer "
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided.' }); // 401 Unauthorized
    }
    // 2. Verify the token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not defined in environment variables (auth middleware).');
        return res.status(500).json({ message: 'Server configuration error.' });
    }
    try {
        // Verify the token using the secret key
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret); // Cast jwtSecret to Secret type
        // Attach the decoded user information to the request object
        // So subsequent route handlers can access req.user.id, req.user.username
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error('Token verification failed:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access Denied: Token expired.' }); // 401 Unauthorized
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Access Denied: Invalid token.' }); // 403 Forbidden
        }
        res.status(500).json({ message: 'Access Denied: Token verification error.', error: error.message });
    }
};
exports.authenticateToken = authenticateToken;
