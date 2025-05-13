import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";

const EditTaskDialog = ({ open, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
    dueDate: "",
  });
  useEffect(() => {
    if (task) {
      const formattedDate = task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "";

      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Low",
        status: task.status || "Pending",
        dueDate: formattedDate,
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/v1/task/${task._id}`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        onSave(response.data.task);
        onClose();
        toast.success("Updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
        />

        <TextField
          label="Priority"
          name="priority"
          select
          fullWidth
          margin="normal"
          value={formData.priority}
          onChange={handleInputChange}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          label="Status"
          name="status"
          select
          fullWidth
          margin="normal"
          value={formData.status}
          onChange={handleInputChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.dueDate}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
