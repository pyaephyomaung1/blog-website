"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const ArticleService_1 = require("../services/ArticleService");
const articleService = new ArticleService_1.ArticleService();
class ArticleController {
    async getAllArticles(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const { articles, total, totalPages, currentPage } = await articleService.getAllArticles(page, limit);
            res.status(200).json({
                articles,
                pagination: {
                    total,
                    totalPages,
                    currentPage,
                    hasNextPage: currentPage < totalPages,
                    hasPrevPage: currentPage > 1,
                },
            });
        }
        catch (error) {
            console.error('Error fetching articles:', error);
            res.status(500).json({ message: 'Error retrieving articles', error: error.message });
        }
    }
    async getArticleById(req, res) {
        try {
            const { id } = req.params;
            const article = await articleService.getArticleByID(id);
            if (article) {
                res.status(200).json(article);
            }
            else {
                res.status(404).json({ message: 'Article not found' });
            }
        }
        catch (error) {
            console.error('Error fetching article by ID:', error);
            res.status(500).json({ message: 'Error retrieving article', error: error.message });
        }
    }
    async createArticle(req, res) {
        try {
            const { title, meta_description, body, categoryId } = req.body;
            let imagePath;
            if (req.file) {
                imagePath = `/images/articles/${req.file.filename}`;
            }
            if (!title || !body || !categoryId) {
                if (req.file) {
                    const fs = require('fs');
                    fs.unlinkSync(req.file.path);
                }
                res.status(400).json({ message: 'Title, body, and category ID are required.' });
                return;
            }
            const newArticle = await articleService.createArticle({
                title,
                meta_description,
                body,
                image: imagePath,
                categoryId,
            });
            res.status(201).json(newArticle);
        }
        catch (error) {
            console.error('Error creating article:', error);
            if (req.file) {
                const fs = require('fs');
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ message: 'Error creating article', error: error.message });
        }
    }
    async updateArticle(req, res) {
        try {
            const { id } = req.params;
            const { title, meta_description, body, categoryId } = req.body;
            let imagePath = req.body.image || undefined;
            if (req.file) {
                imagePath = `/images/articles/${req.file.filename}`;
            }
            const updateData = {};
            if (title !== undefined)
                updateData.title = title;
            if (meta_description !== undefined)
                updateData.meta_description = meta_description;
            if (body !== undefined)
                updateData.body = body;
            if (imagePath !== undefined)
                updateData.image = imagePath;
            if (categoryId !== undefined)
                updateData.categoryId = categoryId;
            const updatedArticle = await articleService.updateArticle(id, updateData);
            if (updatedArticle) {
                res.status(200).json(updatedArticle);
            }
            else {
                res.status(404).json({ message: 'Article not found' });
            }
        }
        catch (error) {
            console.error('Error updating article:', error);
            if (req.file) {
                const fs = require('fs');
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ message: 'Error updating article', error: error.message });
        }
    }
    async deleteArticle(req, res) {
        try {
            const { id } = req.params;
            const deletedArticle = await articleService.deleteArticle(id);
            res.status(200).json({ message: 'Article deleted successfully', article: deletedArticle });
        }
        catch (error) {
            console.error('Error deleting article:', error);
            if (error.message.includes('Record to delete does not exist')) {
                res.status(404).json({ message: 'Article not found' });
                return;
            }
            res.status(500).json({ message: 'Error deleting article', error: error.message });
        }
    }
}
exports.ArticleController = ArticleController;
