import Task from '../models/Task.js';

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('project assignedTo createdBy status');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

// Crear una tarea
export const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear la tarea', details: err.message });
    }
};

// Obtener una tarea por ID
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('project assignedTo createdBy status');
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar la tarea', details: err.message });
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json({ message: 'Tarea eliminada' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};