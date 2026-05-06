import { Router } from 'express';
import { loadUser } from '../middleware/loadUser.middleware.js';
import { tenantGuard } from '../middleware/tenantGuard.middleware.js';

const router = Router();

router.get('/public', (req, res) => {
  res.json({ message: 'Questa route è pubblica — chiunque può vederla' })
})
// GET /api/v1/auth/me
// Ritorna i dati dell'utente loggato (verifica che auth + DB siano allineati)
router.get('/me', loadUser, tenantGuard, (req, res) => {
  res.json({
    message: 'Sei autenticato!',
    user: {
        id: req.user.id,
        clerkId: req.user.clerkId,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        tenantId: req.user.tenantId,
    }
  });
});

export default router;
