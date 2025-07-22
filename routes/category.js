import { Router } from 'express';
import { createCategory, getCategories, deactivatecategory } from '../controllers/category.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.post('/create', createCategory);
router.get('/', getCategories);
router.patch('/deactivate/:id', deactivatecategory);

export default router;

