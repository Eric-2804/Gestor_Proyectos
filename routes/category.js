import { Router } from "express";
import { createCategory, getCategories, deactivatecategory } from "../controllers/category.js";

const router = Router();

router.post('/create', createCategory);
router.get('/', getCategories);
router.patch('/deactivate/:id', deactivatecategory);

export default router;
