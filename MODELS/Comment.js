const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    editedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
