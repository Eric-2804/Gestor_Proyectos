// src/routes/uploadRoutes.js
import express from 'express';
import upload from '../utils/cloudinaryUploader.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/avatar', verifyToken, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: req.file.path },
            { new: true }
        );

        res.status(200).json({
            message: 'Avatar actualizado con éxito',
            avatarUrl: user.avatar,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir avatar', error: error.message });
    }
});

export default router;
