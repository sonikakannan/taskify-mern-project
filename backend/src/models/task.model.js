import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  dueDate: Date,
  subTasks: [String], // New array field for sub-tasks
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  wishlist: {
  type: Boolean,
  default: false,
},

}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
