import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { loadUser } from '../middleware/loadUser.middleware.js';
import { tenantGuard } from '../middleware/tenantGuard.middleware.js';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clients.controller.js';

const router = Router();

router.use(loadUser, tenantGuard);

const clientValidation = [
  body('nameOrCompany')
    .notEmpty().withMessage('Il nome o ragione sociale è obbligatorio')
    .isLength({ max: 200 }).withMessage('Nome troppo lungo (max 200 caratteri)'),
  body('email')
    .optional({ nullable: true, checkFalsy: true })
    .isEmail().withMessage('Email non valida'),
  body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 20 }).withMessage('Telefono troppo lungo'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

router.get('/',     getClients);
router.get('/:id',  getClientById);
router.post('/',    clientValidation, validate, createClient);
router.put('/:id',  clientValidation, validate, updateClient);
router.delete('/:id', deleteClient);

export default router;