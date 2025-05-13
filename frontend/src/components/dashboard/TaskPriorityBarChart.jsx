import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BAR_COLORS = { High: "#ef4444", Medium: "#facc15", Low: "#10b981" };

const TaskPriorityBarChart = ({ priorityData }) => {
  return (
    <div className="bg-white  rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Task Priority Level
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={priorityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Tasks">
            {priorityData.map((entry, index) => (
              <Cell
                key={`bar-${index}`}
                fill={BAR_COLORS[entry.name] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskPriorityBarChart;
