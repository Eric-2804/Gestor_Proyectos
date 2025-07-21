const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
    priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    estimatedHours: { type: Number },
    actualHours: { type: Number },
    startDate: { type: Date },
    dueDate: { type: Date },
    completedAt: { type: Date },
    tags: [String],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
