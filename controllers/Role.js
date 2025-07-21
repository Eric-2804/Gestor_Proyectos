import Role from '../models/Role.js';

export const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await Role.findOne({ name });
    if (exists) return res.status(400).json({ message: 'El rol ya existe' });

    const newRole = new Role({ name, description });
    await newRole.save();

    res.status(201).json({ message: 'Rol creado con éxito', role: newRole });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear rol', error: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isActive: true });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener roles', error: error.message });
  }
};

export const deactivateRole = async (req, res) => {
  try {
    const { id } = req.params;
    await Role.findByIdAndUpdate(id, { isActive: false });
    res.status(200).json({ message: 'Rol desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar rol', error: error.message });
  }
};
