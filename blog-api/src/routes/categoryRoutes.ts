import { Router } from 'express';
import { CategoryController } from '../controllers'; // Import our CategoryController
import { authenticateToken } from '../middleware/auth'; // Import auth middleware

const router = Router();
const categoryController = new CategoryController();

// Public routes (Anyone can view categories)
router.get('/', (req, res) => categoryController.getAllCategories(req, res));
router.get('/:id', (req, res) => categoryController.getCategoryById(req, res));

// Protected routes (Only authenticated admin can create, update, delete categories)
router.post('/create', authenticateToken, (req, res) => categoryController.createCategory(req, res));
router.put('/:id', authenticateToken, (req, res) => categoryController.updateCategory(req, res));
router.delete('/delete/:id', authenticateToken, (req, res) => categoryController.deleteCategory(req, res)); // <-- Confirmed your /delete/:id path

export default router;