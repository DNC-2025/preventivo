import { Router } from 'express';
// import { body, validationResult } from 'express-validator';
import { loadUser } from '../middleware/loadUser.middleware.js';
import { tenantGuard } from '../middleware/tenantGuard.middleware.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';
import { createArticleValidator, updateArticleValidator } from '../middleware/validators/article.validators.js';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articles.controller.js';

const router = Router();

// Middleware applicato a tutte le routes di questo file
router.use(loadUser, tenantGuard);

// ─── Endpoints ───────────────────────────────────────────
router.get('/',     getArticles);
router.get('/:id',  getArticleById);
router.post('/',    createArticleValidator, validateRequest, createArticle);
router.put('/:id',  updateArticleValidator, validateRequest, updateArticle);
router.delete('/:id', deleteArticle);

export default router;