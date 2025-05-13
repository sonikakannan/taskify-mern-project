import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetMyTasksQuery,
  useDeleteTaskMutation,
  useToggleWishlistMutation,
} from "../redux/api/taskApi";
import { TaskFilter } from "../components/manageTask/TaskFilter";
import { TaskList } from "../components/manageTask/TaskList";
import EditTaskDialog from "../components/manageTask/EditTaskDialog";

const ManageTaskPage = () => {
  const { data, isLoading, isError, refetch } = useGetMyTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleWishlist] = useToggleWishlistMutation();
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.tasks) {
      const initialWishlist = data.tasks
        .filter((task) => task.wishlist === true)
        .map((task) => task._id);
      setWishlistIds(initialWishlist);
    }
  }, [data]);

  const handleEditClick = (task) => {
    console.log("Editing Task:", task); // Add this
    setEditTask(task);
    setIsDialogOpen(true);
  };

  const handleSave = (updatedTask) => {
    console.log("Updated Task:", updatedTask);
    refetch();
  };

  if (isLoading) return <p className="text-center">Loading tasks...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load tasks</p>;

  const tasks = data?.tasks || [];
  const groupedTasks = {
    Pending: [],
    "In Progress": [],
    Completed: [],
  };

  tasks.forEach((task) => {
    groupedTasks[task.status]?.push(task);
  });

  const handleCardClick = (taskId) => {
    navigate(`/manage-tasks/subtask/${taskId}`);
  };

  const handleWishlistToggle = async (taskId) => {
    try {
      await toggleWishlist(taskId);
      setWishlistIds((prev) =>
        prev.includes(taskId)
          ? prev.filter((id) => id !== taskId)
          : [...prev, taskId]
      );
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <TaskFilter
        statusOptions={Object.keys(groupedTasks)}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        groupedTasks={groupedTasks}
      />
      <TaskList
        tasks={groupedTasks[selectedStatus]}
        wishlistIds={wishlistIds}
        onCardClick={handleCardClick}
        onWishlistToggle={handleWishlistToggle}
        onDelete={handleDelete}
        onEditClick={handleEditClick}
        navigate={navigate}
      />
      {editTask && (
        <EditTaskDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          task={editTask}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageTaskPage;
