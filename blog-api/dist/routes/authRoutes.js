"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers"); // Import our AuthController
const router = (0, express_1.Router)();
const authController = new controllers_1.AuthController();
// POST /api/auth/login - Handles user login and returns a JWT
router.post('/login', (req, res) => authController.login(req, res));
// You can add other auth-related routes here later, e.g., /register, /forgot-password
// But for admin-only, 'login' is sufficient.
exports.default = router;
