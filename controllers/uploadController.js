import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

export const cargarAvatar = async (req, res) => {
    const { id } = req.params;

    if (!req.files || !req.files.avatar) {
        return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const file = req.files.avatar.tempFilePath;

    try {
        // Subir a Cloudinary
        const result = await cloudinary.uploader.upload(file, {
            folder: 'avatars'
        });

        // Eliminar avatar anterior si existe
        const user = await User.findById(id);
        if (user.avatar?.includes('res.cloudinary.com')) {
            const publicId = user.avatar.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`avatars/${publicId}`);
        }

        user.avatar = result.secure_url;
        await user.save();

        res.json({ avatar: result.secure_url, message: 'Avatar actualizado con éxito' });

    } catch (error) {
        res.status(500).json({ error: 'Error al subir el avatar', details: error.message });
    }
};
