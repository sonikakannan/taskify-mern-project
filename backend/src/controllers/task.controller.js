import { Task } from "../models/task.model.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, status, subTasks } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      subTasks,
      user: req.user.id,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const updateSubtasks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subTasks } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    task.subTasks = subTasks;
    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// Toggle wishlist
export const toggleWishlist = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    task.wishlist = !task.wishlist;
    await task.save();

    res.status(200).json({ success: true, wishlist: task.wishlist });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

// Add to task.controller.js
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    Object.assign(task, updates);
    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

