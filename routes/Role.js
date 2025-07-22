import { Router } from 'express';
import { createRole, getRoles, deactivateRole } from '../controllers/role.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(verifyToken);
router.use(isAdmin);

router.post('/create', createRole);
router.get('/', getRoles);
router.patch('/deactivate/:id', deactivateRole);

export default router;

