import React from "react";

export const TaskFilter = ({
  statusOptions,
  selectedStatus,
  setSelectedStatus,
  groupedTasks,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">My Tasks</h1>
      <div className="flex gap-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded ${
              selectedStatus === status
                ? status === "Pending"
                  ? "bg-yellow-500 text-white"
                  : status === "In Progress"
                  ? "bg-blue-500 text-white"
                  : "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {status} ({groupedTasks[status]?.length || 0})
          </button>
        ))}
      </div>
    </div>
  );
};
