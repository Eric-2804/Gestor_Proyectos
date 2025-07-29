
import express from 'express';
import { suggestAssignee } from '../controllers/ia.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/suggest-assignee', verifyToken, suggestAssignee);

export default router;
