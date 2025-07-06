"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers"); // Import our CategoryController
const auth_1 = require("../middleware/auth"); // Import auth middleware
const router = (0, express_1.Router)();
const categoryController = new controllers_1.CategoryController();
// Public routes (Anyone can view categories)
router.get('/', (req, res) => categoryController.getAllCategories(req, res));
router.get('/:id', (req, res) => categoryController.getCategoryById(req, res));
// Protected routes (Only authenticated admin can create, update, delete categories)
router.post('/create', auth_1.authenticateToken, (req, res) => categoryController.createCategory(req, res));
router.put('/:id', auth_1.authenticateToken, (req, res) => categoryController.updateCategory(req, res));
router.delete('/delete/:id', auth_1.authenticateToken, (req, res) => categoryController.deleteCategory(req, res)); // <-- Confirmed your /delete/:id path
exports.default = router;
