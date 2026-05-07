import { body } from 'express-validator';

export const createArticleValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Il nome è obbligatorio')
    .isLength({ max: 200 }).withMessage('Il nome non può superare 200 caratteri'),

  body('category')
    .trim()
    .notEmpty().withMessage('La categoria è obbligatoria')
    .isLength({ max: 100 }).withMessage('La categoria non può superare 100 caratteri'),

  body('unit')
    .trim()
    .notEmpty().withMessage('L\'unità di misura è obbligatoria')
    .isLength({ max: 20 }).withMessage('L\'unità non può superare 20 caratteri'),

  body('price')
    .notEmpty().withMessage('Il prezzo è obbligatorio')
    .isFloat({ min: 0 }).withMessage('Il prezzo deve essere un numero positivo'),

  body('metadata')
    .optional()
    .isObject().withMessage('Il metadata deve essere un oggetto JSON'),
];

export const updateArticleValidator = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Il nome non può essere vuoto')
    .isLength({ max: 200 }).withMessage('Il nome non può superare 200 caratteri'),

  body('category')
    .optional()
    .trim()
    .notEmpty().withMessage('La categoria non può essere vuota')
    .isLength({ max: 100 }).withMessage('La categoria non può superare 100 caratteri'),
 
  body('unit')
    .optional()
    .trim()
    .notEmpty().withMessage('L\'unità non può essere vuota')
    .isLength({ max: 20 }).withMessage('L\'unità non può superare 20 caratteri'),

  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Il prezzo deve essere un numero positivo'),

  body('active')
    .optional()
    .isBoolean().withMessage('Il campo active deve essere true o false'),

  body('metadata')
    .optional()
    .isObject().withMessage('Il metadata deve essere un oggetto JSON'),
];