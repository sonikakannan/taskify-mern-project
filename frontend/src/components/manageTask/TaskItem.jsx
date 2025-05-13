import React from "react";
import { format } from "date-fns";
import { FaRegHeart, FaHeart, FaEdit, FaTrash } from "react-icons/fa";

export const TaskItem = ({
  task,
  wishlistIds,
  onCardClick,
  onWishlistToggle,
  onDelete,
  onEditClick,
}) => {
  return (
    <li
      key={task._id}
      className="bg-white p-3 rounded-md shadow text-sm cursor-pointer hover:shadow-lg transition"
      onClick={() => onCardClick(task._id)}
    >
      <p
        className={`text-sm font-semibold mb-4 p-0.5 flex items-end max-w-20 justify-center ${
          task.priority === "Low"
            ? "text-green-600 bg-green-100 rounded"
            : task.priority === "Medium"
            ? "text-yellow-600 bg-yellow-100 rounded"
            : "text-red-600 bg-red-100 rounded"
        }`}
      >
        {task.priority}
      </p>
      <h1 className="font-semibold">{task.title}</h1>
      <p className="text-xs text-gray-600 font-bold py-2">{task.description}</p>
      {/* Show Progress bar here */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">
          <span className="font-bold text-gray-900">Start Date:</span>
          <span className="block">
            {format(new Date(task.createdAt), "dd MMM yyyy")}
          </span>
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-bold text-gray-900">Due Date:</span>
          <span className="block">
            {task.dueDate
              ? format(new Date(task.dueDate), "dd MMM yyyy")
              : "N/A"}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-end gap-3 my-2">
        <button
          title="Toggle Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(task._id);
          }}
        >
          {wishlistIds.includes(task._id) ? (
            <FaHeart className="text-rose-500 text-lg" />
          ) : (
            <FaRegHeart className="text-rose-500 text-lg" />
          )}
        </button>
        <button
          title="Edit Task"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(task);
            {
              /* Correctly call the function */
            }
          }}
        >
          <FaEdit className="text-green-500 text-lg" />
        </button>
        <button
          title="Delete Task"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
        >
          <FaTrash className="text-red-500 text-lg" />
        </button>
      </div>
    </li>
  );
};
