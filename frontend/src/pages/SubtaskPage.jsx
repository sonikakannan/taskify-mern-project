import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useGetTaskByIdQuery } from "../redux/api/taskApi";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { BiLeftArrowAlt } from "react-icons/bi";
import axios from "axios";

const SubtaskPage = () => {
  const { taskId } = useParams();
  const { data, isLoading, isError, refetch } = useGetTaskByIdQuery(taskId);
  const [completed, setCompleted] = useState({});
  const [open, setOpen] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`completed_subtasks_${taskId}`);
    if (stored) setCompleted(JSON.parse(stored));
  }, [taskId]);

  const handleCheck = (subTask) => {
    const updated = {
      ...completed,
      [subTask]: !completed[subTask],
    };
    setCompleted(updated);
    localStorage.setItem(
      `completed_subtasks_${taskId}`,
      JSON.stringify(updated)
    );
  };

  const handleDelete = async (subTaskToDelete) => {
    try {
      const updatedSubTasks = data.task.subTasks.filter(
        (sub) => sub !== subTaskToDelete
      );

      await axios.put(
        `http://localhost:5001/api/v1/task/${taskId}/update-subtasks`,
        { subTasks: updatedSubTasks },
        { withCredentials: true }
      );

      refetch();
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return;

    try {
      const updatedSubTasks = [
        ...(data?.task?.subTasks || []),
        newSubtask.trim(),
      ];

      await axios.put(
        `http://localhost:5001/api/v1/task/${taskId}/update-subtasks`,
        { subTasks: updatedSubTasks },
        { withCredentials: true }
      );

      setNewSubtask("");
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Error adding subtask:", error);
    }
  };

  if (isLoading) return <p className="text-center">Loading subtasks...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load subtasks</p>;

  const task = data?.task;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold flex gap-3 items-center">
          <Link to="/manage-tasks">
            <BiLeftArrowAlt className="text-2xl cursor-pointer" />
          </Link>
          Subtasks for {task?.title}
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
        >
          <FiPlus /> Add Task
        </button>
      </div>

      <ul className="space-y-2">
        {task?.subTasks?.length > 0 ? (
          task.subTasks.map((subTask, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded shadow-sm hover:bg-gray-100 transition duration-200"
            >
              <div className="flex items-center gap-2">
                <button onClick={() => handleCheck(subTask)}>
                  {completed[subTask] ? (
                    <FaCheckCircle className="text-green-600 text-lg" />
                  ) : (
                    <RiCheckboxBlankCircleLine className="text-lg" />
                  )}
                </button>
                <span
                  className={`text-sm ${
                    completed[subTask] ? "line-through text-gray-400" : ""
                  }`}
                >
                  {subTask}
                </span>
              </div>
              <button
                onClick={() => handleDelete(subTask)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No subtasks available</p>
        )}
      </ul>

      {/* Material UI Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subtask Name"
            type="text"
            fullWidth
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            Cancel
          </Button>
          <Button
            onClick={handleAddSubtask}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubtaskPage;
