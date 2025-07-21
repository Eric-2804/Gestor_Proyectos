import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
        joinedAt: { type: Date, default: Date.now }
    }],
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    startDate: { type: Date },
    endDate: { type: Date },
    estimatedHours: { type: Number },
    actualHours: { type: Number },
    budget: { type: Number },
    isActive: { type: Boolean, default: true },
    tags: [String]
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;

