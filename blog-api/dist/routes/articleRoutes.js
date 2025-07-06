"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticleController_1 = require("../controllers/ArticleController"); // Import our ArticleController
const upload_1 = require("../middleware/upload"); // Import the upload middleware
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const articleController = new ArticleController_1.ArticleController();
// GET all articles (with pagination)
router.get('/', articleController.getAllArticles.bind(articleController));
// GET a single article by ID
router.get('/:id', articleController.getArticleById.bind(articleController));
// POST a new article (Uses uploadImage.single('image') for a single file upload named 'image')
router.post('/create', auth_1.authenticateToken, upload_1.uploadImage.single('image'), // This middleware will process the uploaded file
articleController.createArticle.bind(articleController));
// PUT (update) an existing article by ID (Uses uploadImage.single('image') if image is updated)
router.put('/update/:id', auth_1.authenticateToken, upload_1.uploadImage.single('image'), // This middleware will process the uploaded file if present
articleController.updateArticle.bind(articleController));
// DELETE an article by ID
router.delete('/delete/:id', auth_1.authenticateToken, articleController.deleteArticle.bind(articleController));
exports.default = router;
