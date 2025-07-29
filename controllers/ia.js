
import User from '../models/User.js';
import Task from '../models/Task.js';

export const suggestAssignee = async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ message: 'Se requiere un rol para sugerir un usuario' });
    }

    // Buscar usuarios con ese rol
    const users = await User.find().populate('globalRole');

    const candidates = users.filter(user => user.globalRole?.name === role);

    if (candidates.length === 0) {
      return res.status(404).json({ message: 'No hay usuarios con el rol especificado' });
    }

    // Contar tareas activas por usuario
    const loadByUser = await Promise.all(
      candidates.map(async user => {
        const taskCount = await Task.countDocuments({
          assignedTo: user._id,
          status: { $ne: 'completed' } 
        });
        return { user, taskCount };
      })
    );

    const bestCandidate = loadByUser.reduce((min, current) =>
      current.taskCount < min.taskCount ? current : min
    );

    res.json({
      message: 'Usuario sugerido para asignar la tarea',
      user: {
        _id: bestCandidate.user._id,
        name: `${bestCandidate.user.firstName} ${bestCandidate.user.lastName}`,
        email: bestCandidate.user.email,
        avatar: bestCandidate.user.avatar,
        tareasAsignadas: bestCandidate.taskCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al sugerir usuario', error: error.message });
  }
};
