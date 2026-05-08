import { body } from 'express-validator';

export const createClientValidator = [
  body('nameOrCompany')
    .trim()
    .notEmpty()
    .withMessage('Il nome è obbligatorio')
    .isLength({ max: 200 })
    .withMessage('Il nome non può superare 200 caratteri'),

  body('country')
    .optional({ values: 'falsy' })
    .trim()
    .isString()
    .isLength({ max: 100 })
    .withMessage('Il paese non può superare 100 caratteri'),

  body('city')
    .optional({ values: 'falsy' })
    .trim()
    .isString()
    .isLength({ max: 100 })
    .withMessage('La città non può superare 100 caratteri'),

  body('email')
    .optional({ values: 'falsy' })
    .isEmail()
    .withMessage('Email non valida'),
];

export const updateClientValidator = [
  body('nameOrCompany')
    .optional()
    .trim()
    .isLength({ max: 200 }),

  body('country')
    .optional({ values: 'falsy' })
    .trim()
    .isString()
    .isLength({ max: 100 }),
    
  body('city')
    .optional({ values: 'falsy' })
    .trim()
    .isString()
    .isLength({ max: 100 }),

  body('email')
    .optional({ values: 'falsy' })
    .isEmail(),
];