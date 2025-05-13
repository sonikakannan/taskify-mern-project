import React from "react";
import { useGetMeQuery } from "../redux/api/authApi";
import { useGetMyTasksQuery } from "../redux/api/taskApi";
import moment from "moment";
import StatsOverview from "../components/dashboard/StatsOverview";
import TaskStatusPieChart from "../components/dashboard/TaskStatusPieChart";
import TaskPriorityBarChart from "../components/dashboard/TaskPriorityBarChart";

const DashboardPage = () => {
  const { data: userData } = useGetMeQuery();
  const { data: taskData, isLoading, isError } = useGetMyTasksQuery();

  const tasks = taskData?.tasks || [];

  // Task status counts
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  // Task priority counts
  const highPriority = tasks.filter((task) => task.priority === "High").length;
  const mediumPriority = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;
  const lowPriority = tasks.filter((task) => task.priority === "Low").length;

  const stats = [
    { label: "Total Tasks", value: totalTasks, color: "bg-blue-500" },
    { label: "Pending", value: pendingTasks, color: "bg-purple-500" },
    { label: "In Progress", value: inProgressTasks, color: "bg-orange-500" },
    { label: "Completed", value: completedTasks, color: "bg-green-500" },
  ];

  const pieData = [
    { name: "Pending", value: pendingTasks },
    { name: "In Progress", value: inProgressTasks },
    { name: "Completed", value: completedTasks },
  ];

  const priorityData = [
    { name: "High", value: highPriority },
    { name: "Medium", value: mediumPriority },
    { name: "Low", value: lowPriority },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100  max-h-screen overflow-y-scroll">
      <div className="bg-white  rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-semibold text-gray-800  mb-2">
          Welcome, {userData?.user?.name || "User"}!
        </h1>
        <p className="text-sm text-gray-500 mb-1">
          {moment().format("dddd, Do MMMM YYYY")}
        </p>
        {isLoading ? (
          <p className="text-gray-600">Loading task stats...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load tasks.</p>
        ) : (
          <StatsOverview stats={stats} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!isLoading && !isError && (
          <>
            <TaskStatusPieChart pieData={pieData} />
            <TaskPriorityBarChart priorityData={priorityData} />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
