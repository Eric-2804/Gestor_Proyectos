// controllers/projectController.js
import Project from '../models/Project.js';

// Crear proyecto
export const createProject = async (req, res) => {
    try {
        const project = new Project({ ...req.body, owner: req.user._id });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
};

// Obtener todos los proyectos
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('owner', 'firstName lastName');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};

// Obtener un proyecto por ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('owner', 'firstName lastName')
            .populate('members.user', 'firstName lastName')
            .populate('members.role', 'name');
        if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el proyecto' });
    }
};

// Actualizar un proyecto
export const updateProject = async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
};

// Eliminar un proyecto
export const deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
};