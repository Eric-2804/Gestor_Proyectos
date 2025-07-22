// controllers/categoryController.js
import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user?._id;
    if (!name || !createdBy) return res.status(400).json({ message: 'Faltan campos requeridos' });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: 'La categoría ya existe' });

    const newCategory = new Category({ name, description, createdBy });
    await newCategory.save();

    res.status(201).json({ message: 'Categoría creada con éxito', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('createdBy', 'firstName lastName email');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

export const deactivateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndUpdate(id, { isActive: false });
    res.status(200).json({ message: 'Categoría desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar categoría' });
  }
};