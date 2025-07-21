import User from '../models/User.js';
import Role from '../models/Role.js';

// Listar todos los usuarios (solo Admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('globalRole', 'name description');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Ver perfil del usuario autenticado
export const getProfile = (req, res) => {
    const user = req.user;
    res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        globalRole: user.globalRole?.name || null,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
    });
};

// Actualizar perfil del usuario autenticado
export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const updated = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};

// Cambiar rol global (solo Admin)
export const changeUserRole = async (req, res) => {
    try {
        const { roleId } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        const role = await Role.findById(roleId);
        if (!role) return res.status(404).json({ error: 'Rol no encontrado' });

        user.globalRole = role._id;
        await user.save();
        res.json({ message: 'Rol actualizado', user });
    } catch (err) {
        res.status(500).json({ error: 'Error al cambiar el rol del usuario' });
    }
};

// Eliminar usuario (solo Admin)
export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

