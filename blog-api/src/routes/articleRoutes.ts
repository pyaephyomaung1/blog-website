import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController'; // Import our ArticleController
import { uploadImage } from '../middleware/upload'; // Import the upload middleware

const router = Router();
const articleController = new ArticleController();

// GET all articles (with pagination)
router.get('/', articleController.getAllArticles.bind(articleController));

// GET a single article by ID
router.get('/:id', articleController.getArticleById.bind(articleController));

// POST a new article (Uses uploadImage.single('image') for a single file upload named 'image')
router.post(
  '/',
  uploadImage.single('image'), // This middleware will process the uploaded file
  articleController.createArticle.bind(articleController)
);

// PUT (update) an existing article by ID (Uses uploadImage.single('image') if image is updated)
router.put(
  '/:id',
  uploadImage.single('image'), // This middleware will process the uploaded file if present
  articleController.updateArticle.bind(articleController)
);

// DELETE an article by ID
router.delete('/:id',articleController.deleteArticle.bind(articleController));

export default router;