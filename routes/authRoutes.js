import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const secretKey = process.env.JWT_SECRET || 'secret123';

// Registro básico
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        // Token JWT
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1d' });

        res.status(201).json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;

