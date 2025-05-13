import React from "react";

const SubTasks = ({ subTasks, setSubTasks }) => {
  const handleSubTaskChange = (index, value) => {
    const updated = [...subTasks];
    updated[index] = value;
    setSubTasks(updated);
  };

  const addSubTask = () => {
    setSubTasks([...subTasks, ""]);
  };

  const removeSubTask = (index) => {
    if (subTasks.length === 1) return; // Prevent removing the last input
    const updated = [...subTasks];
    updated.splice(index, 1);
    setSubTasks(updated);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Sub Tasks
      </label>
      {subTasks.map((task, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={task}
            onChange={(e) => handleSubTaskChange(index, e.target.value)}
            placeholder={`Sub Task ${index + 1}`}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            type="button"
            onClick={addSubTask}
            className="border border-green-500 text-green-500 rounded-full px-2 cursor-pointer"
          >
            +
          </button>
          {subTasks.length > 1 && (
            <button
              type="button"
              onClick={() => removeSubTask(index)}
              className="border border-red-500 text-red-500 rounded-full px-2 cursor-pointer"
            >
              −
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubTasks;
