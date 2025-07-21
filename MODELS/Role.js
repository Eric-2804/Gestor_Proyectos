const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Admin, Project Manager, Developer, Viewer
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
