import express from 'express';
import { createTask, deleteTask, getMyTasks, getTaskById, toggleWishlist, updateSubtasks, updateTask } from '../controllers/task.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', isAuthenticated, createTask);
router.get('/my-tasks', isAuthenticated, getMyTasks);
router.get('/:id', isAuthenticated, getTaskById); 
router.put('/:id/update-subtasks', isAuthenticated, updateSubtasks);
router.put('/:id/toggle-wishlist', isAuthenticated, toggleWishlist);
router.delete('/:id', isAuthenticated, deleteTask);
router.put('/:id', isAuthenticated, updateTask); // Add this line


export default router;