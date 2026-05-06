import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { loadUser } from '../middleware/loadUser.middleware.js';
import { tenantGuard } from '../middleware/tenantGuard.middleware.js';
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

// Regole di validazione riutilizzabili
const articleValidation = [
  body('name')
    .notEmpty().withMessage('Il nome è obbligatorio')
    .isLength({ max: 200 }).withMessage('Nome troppo lungo (max 200 caratteri)'),
  body('category')
    .notEmpty().withMessage('La categoria è obbligatoria'),
  body('unit')
    .notEmpty().withMessage("L'unità di misura è obbligatoria"),
  body('price')
    .notEmpty().withMessage('Il prezzo è obbligatorio')
    .isFloat({ min: 0 }).withMessage('Il prezzo deve essere un numero positivo'),
];

// Middleware che controlla gli errori di validazione
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// ─── Endpoints ───────────────────────────────────────────
router.get('/',     getArticles);
router.get('/:id',  getArticleById);
router.post('/',    articleValidation, validate, createArticle);
router.put('/:id',  articleValidation, validate, updateArticle);
router.delete('/:id', deleteArticle);

export default router;