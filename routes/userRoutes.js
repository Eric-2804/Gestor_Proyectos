import express from 'express';
import {
    getAllUsers,
    getProfile,
    updateProfile,
    changeUserRole,
    deleteUser
} from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken); // Protege todas las rutas siguientes

router.get('/', isAdmin, getAllUsers);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/:id/role', isAdmin, changeUserRole);
router.delete('/:id', isAdmin, deleteUser);

export default router;
