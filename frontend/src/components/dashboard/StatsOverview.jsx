import React from "react";

const StatsOverview = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className={`w-2 md:w-2 h-3 md:h-5 rounded-full ${stat.color}`} />
          <h2 className="text-lg font-semibold text-gray-700 ">
            {stat.value} {stat.label}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
