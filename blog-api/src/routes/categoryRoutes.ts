import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController'; // Import our CategoryController

const router = Router();
const categoryController = new CategoryController();

// Using arrow functions to ensure 'this' context
// This is often preferred for readability over .bind()
router.get('/', categoryController.getAllCategories.bind(categoryController));
router.get('/:id', categoryController.getCategoryById.bind(categoryController));
router.post('/create',categoryController.createCategory.bind(categoryController)); // Using your '/create' path
router.put('/:id', categoryController.updateCategory.bind(categoryController));
router.delete('/delete/:id',categoryController.deleteCategory.bind(categoryController));

export default router;