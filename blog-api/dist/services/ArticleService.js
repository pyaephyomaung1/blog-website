"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const uuid_1 = require("uuid");
const upload_1 = require("../middleware/upload");
class ArticleService {
    async getAllArticles(page = 1, limit = 8) {
        const skip = (page - 1) * limit;
        const [articles, total] = await prisma_1.default.$transaction([
            prisma_1.default.article.findMany({
                skip: skip,
                take: limit,
                orderBy: {
                    createdAt: "desc", // Order by creation date, newest first
                },
                include: {
                    category: true, // Include the related category details
                },
            }),
            prisma_1.default.article.count(), // Get total count of articles
        ]);
        return {
            articles,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
    }
    async getArticleByID(id) {
        return await prisma_1.default.article.findUnique({
            where: { id },
            include: {
                category: true
            },
        });
    }
    async createArticle(articleData) {
        const categoryExist = await prisma_1.default.category.findUnique({
            where: { id: articleData.categoryId },
        });
        if (!categoryExist) {
            throw new Error("category not found");
        }
        return await prisma_1.default.article.create({
            data: {
                id: (0, uuid_1.v4)(),
                title: articleData.title,
                meta_description: articleData.meta_description,
                body: articleData.body,
                image: articleData.image,
                categoryId: articleData.categoryId,
            }
        });
    }
    async updateArticle(id, articleData) {
        if (articleData.categoryId) {
            const categoryExists = await prisma_1.default.category.findUnique({
                where: { id: articleData.categoryId },
            });
            if (!categoryExists) {
                throw new Error(`Category with ID "${articleData.categoryId}" not found.`);
            }
        }
        return await prisma_1.default.article.update({
            where: { id },
            data: articleData,
        });
    }
    async deleteArticle(id) {
        // First, find the article to get its image path
        const articleToDelete = await prisma_1.default.article.findUnique({
            where: { id },
        });
        if (!articleToDelete) {
            throw new Error('Record to delete does not exist.'); // Match Prisma's error for consistency
        }
        // If the article has an image, attempt to delete it from storage
        if (articleToDelete.image) {
            const deleted = (0, upload_1.deleteFileFromStorage)(articleToDelete.image);
            if (deleted) {
                console.log(`✅ Image file deleted: ${articleToDelete.image}`);
            }
            else {
                console.warn(`⚠️ Could not delete image file: ${articleToDelete.image}`);
            }
        }
        // Now, delete the article record from the database
        return await prisma_1.default.article.delete({
            where: { id },
        });
    }
}
exports.ArticleService = ArticleService;
