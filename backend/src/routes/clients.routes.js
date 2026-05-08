import { Router } from 'express';
import { validationResult } from 'express-validator';
import { loadUser } from '../middleware/loadUser.middleware.js';
import { tenantGuard } from '../middleware/tenantGuard.middleware.js';
import { createClientValidator, updateClientValidator } from '../middleware/validators/client.validators.js';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clients.controller.js';
import { validateRequest422 } from '../middleware/validateRequest.middleware.js';

const router = Router();

router.use(loadUser, tenantGuard);

router.get('/',     getClients);
router.get('/:id',  getClientById);
router.post('/',    createClientValidator, validateRequest422, createClient);
router.put('/:id',  updateClientValidator, validateRequest422, updateClient);
router.delete('/:id', deleteClient);

export default router;