const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const secretKey = process.env.JWT_SECRET || 'secret123';

// 1. Verificar que el token JWT sea válido
exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ error: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id).populate('globalRole');
        if (!user) return res.status(401).json({ error: 'Usuario no válido' });

        req.user = user; // Inyectamos el usuario en la request
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

// 2. Middleware: Solo para ADMIN global
exports.isAdmin = (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Usuario no autenticado' });

    if (req.user.globalRole?.name !== 'Admin') {
        return res.status(403).json({ error: 'Permiso denegado: Solo Admin' });
    }

    next();
};

// 3. Middleware: Acepta uno o más roles globales
exports.hasRole = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'Usuario no autenticado' });

        const roleName = req.user.globalRole?.name;
        if (!roles.includes(roleName)) {
            return res.status(403).json({ error: `Se requiere uno de estos roles: ${roles.join(', ')}` });
        }

        next();
    };
};
