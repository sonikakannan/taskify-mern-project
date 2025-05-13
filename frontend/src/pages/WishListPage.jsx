import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetMyTasksQuery,
  useToggleWishlistMutation,
  useDeleteTaskMutation,
} from "../redux/api/taskApi";
import { TaskList } from "../components/manageTask/TaskList";
import EditTaskDialog from "../components/manageTask/EditTaskDialog";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://taskify-mern-project-backend.onrender.com";

const WishListPage = () => {
  const { data, isLoading, isError, refetch } = useGetMyTasksQuery();
  const [toggleWishlist] = useToggleWishlistMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.tasks) {
      const filteredWishlist = data.tasks.filter((task) => task.wishlist);
      setWishlistIds(filteredWishlist.map((task) => task._id));
    }
  }, [data]);

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
      refetch();
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

  const handleEditClick = (task) => {
    setEditTask(task);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    refetch();
  };

  if (isLoading) return <p className="text-center">Loading wishlist...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load wishlist</p>;

  const wishlistTasks = data.tasks.filter((task) =>
    wishlistIds.includes(task._id)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">My Wishlist Tasks</h2>
      <TaskList
        tasks={wishlistTasks}
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

export default WishListPage;
