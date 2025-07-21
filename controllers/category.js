import Category from '../models/Category.js'

export const createCategory = async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: 'La categoría ya existe' });

    const newCategory = new Category({ name, description, createdBy });
    await newCategory.save();

    res.status(201).json({ message: 'Categoría creada con éxito', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría', error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).populate('createdBy', 'name email');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
};

export const deactivatecategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndUpdate(id, { isActive: false });
    res.status(200).json({ message: 'Categoría desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar categoría', error: error.message });
  }
};
