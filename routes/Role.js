import { Router } from 'express';
import { createRole, getRoles, deactivateRole } from '../controllers/Role.js';

const router = Router();

router.post('/create', createRole);
router.get('/', getRoles);
router.patch('/deactivate/:id', deactivateRole);

export default router;
