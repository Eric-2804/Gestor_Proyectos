const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['Project', 'Task'], required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('State', stateSchema);
