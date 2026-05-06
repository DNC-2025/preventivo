import { Router } from 'express';
import { loadUser } from '../middleware/loadUser.middleware.js';
import { tenantGuard } from '../middleware/tenantGuard.middleware.js';
import { upload, importArticlesFromCsv } from '../controllers/csv.controller.js';

const router = Router();

router.use(loadUser, tenantGuard);

// POST /api/v1/csv/import
// multer processa il file PRIMA del controller
router.post('/import', upload.single('file'), importArticlesFromCsv);

export default router;