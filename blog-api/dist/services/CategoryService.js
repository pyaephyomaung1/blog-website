"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const uuid_1 = require("uuid");
class CategoryService {
    async getCategories() {
        return await prisma_1.default.category.findMany({
            orderBy: {
                name: "asc",
            },
        });
    }
    async getCategoryByID(id) {
        return await prisma_1.default.category.findUnique({
            where: { id },
            include: {
                articles: true,
            },
        });
    }
    async createCategory(name) {
        const existingCategory = await prisma_1.default.category.findUnique({
            where: { name },
        });
        if (existingCategory) {
            throw new Error(`Category with ${name} already exists`);
        }
        return await prisma_1.default.category.create({
            data: {
                id: (0, uuid_1.v4)(),
                name,
            },
        });
    }
    async updateCategory(id, name) {
        const existingCategoryWithName = await prisma_1.default.category.findUnique({
            where: { name },
        });
        if (existingCategoryWithName && existingCategoryWithName.id !== id) {
            throw new Error(`Category with name "${name}" already exists.`);
        }
        return await prisma_1.default.category.update({
            where: { id },
            data: {
                name
            },
        });
    }
    async deleteCategory(id) {
        const categoryWithArticles = await prisma_1.default.category.findUnique({
            where: { id },
            include: {
                articles: true
            },
        });
        if (categoryWithArticles && categoryWithArticles.articles.length > 0) {
            throw new Error('Cannot delete category with associated articles. Please delete articles first.');
        }
        return await prisma_1.default.category.delete({
            where: { id },
        });
    }
}
exports.CategoryService = CategoryService;
