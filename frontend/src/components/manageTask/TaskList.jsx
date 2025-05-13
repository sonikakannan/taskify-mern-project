import React from "react";
import { TaskItem } from "./TaskItem";

export const TaskList = ({
  tasks,
  wishlistIds,
  onCardClick,
  onWishlistToggle,
  onDelete,
  onEditClick,
  navigate,
}) => {
  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              wishlistIds={wishlistIds}
              onCardClick={onCardClick}
              onWishlistToggle={onWishlistToggle}
              onDelete={onDelete}
              onEditClick={onEditClick}
              navigate={navigate}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No tasks</p>
        )}
      </ul>
    </div>
  );
};
