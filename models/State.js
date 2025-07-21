import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: {
    type: String,
    enum: ['Project', 'Task'],
    required: true,
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const State = mongoose.model('State', stateSchema);
export default State;

