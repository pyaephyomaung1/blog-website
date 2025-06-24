import { Router } from 'express';
import { AuthController } from '../controllers'; // Import our AuthController

const router = Router();
const authController = new AuthController();

// POST /api/auth/login - Handles user login and returns a JWT
router.post('/login', (req, res) => authController.login(req, res));

// You can add other auth-related routes here later, e.g., /register, /forgot-password
// But for admin-only, 'login' is sufficient.

export default router;