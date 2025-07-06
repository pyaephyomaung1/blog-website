"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
const categoryService = new CategoryService_1.CategoryService();
class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getCategories();
            res.status(200).json(categories);
        }
        catch (error) {
            console.error("Error fetching categories: ", error);
            res
                .status(500)
                .json({ message: "Error retrieving categories", error: error.message });
        }
    }
    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryByID(id);
            if (category) {
                res.status(200).json(category);
                return;
            }
            else {
                res.status(404).json({ message: "category not found" });
            }
        }
        catch (error) {
            console.error("Error fetching category by ID:", error);
            res
                .status(500)
                .json({ message: "Error retrieving category", error: error.message });
        }
    }
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            if (!name || typeof name !== "string" || name.trim() == "") {
                res.status(400).json({ message: "category name is required" });
                return;
            }
            const newCategory = await categoryService.createCategory(name.trim());
            res.status(201).json(newCategory);
        }
        catch (error) {
            console.error("Error creating a category");
            if (error.message.includes("already exists")) {
                res.status(409).json({ message: error.message });
                return;
            }
            res
                .status(500)
                .json({ message: "Erro creating category", error: error.message });
        }
    }
    async updateCategory(req, res) {
        try {
            const { id } = req.params; // Get ID from URL parameters
            const { name } = req.body; // Get new name from request body
            if (!name || typeof name !== "string" || name.trim() === "") {
                res
                    .status(400)
                    .json({
                    message: "Category name is required and must be a non-empty string.",
                });
                return;
            }
            const updatedCategory = await categoryService.updateCategory(id, name.trim());
            if (updatedCategory) {
                res.status(200).json(updatedCategory);
            }
            else {
                res.status(404).json({ message: "Category not found" });
            }
        }
        catch (error) {
            console.error("Error updating category:", error);
            if (error.message.includes("already exists")) {
                res.status(409).json({ message: error.message }); // 409 Conflict
                return;
            }
            res
                .status(500)
                .json({ message: "Error updating category", error: error.message });
        }
    }
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const deletedCategory = await categoryService.deleteCategory(id);
            res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
        }
        catch (error) {
            console.error('Error deleting category:', error);
            if (error.message.includes('Record to delete does not exist')) {
                res.status(404).json({ message: 'Category not found' });
                return;
            }
            if (error.message.includes('Cannot delete category with associated articles')) {
                res.status(400).json({ message: error.message }); // Bad Request if articles exist
                return;
            }
            res.status(500).json({ message: 'Error deleting category', error: error.message });
        }
    }
}
exports.CategoryController = CategoryController;
