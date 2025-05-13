import React from "react";
import SubTasks from "./SubTasks";
import FormField from "./FormField";

const TaskForm = ({
  formData,
  setFormData,
  subTasks,
  setSubTasks,
  handleFormSubmit,
  isLoading,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isSubTaskEmpty = subTasks.every((task) => task.trim() === "");
  const isFormIncomplete =
    !formData.title ||
    !formData.description ||
    !formData.priority ||
    !formData.dueDate ||
    !formData.status ||
    isSubTaskEmpty;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit({ ...formData, subTasks });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <FormField
        label="Task Title"
        name="title"
        type="text"
        placeholder="Enter task title"
        value={formData.title}
        onChange={handleChange}
      />
      <FormField
        label="Description"
        name="description"
        type="textarea"
        placeholder="Enter task description"
        value={formData.description}
        onChange={handleChange}
        rows={5}
      />
      <SubTasks subTasks={subTasks} setSubTasks={setSubTasks} />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Priority"
          name="priority"
          type="select"
          options={["Low", "Medium", "High"]}
          value={formData.priority}
          onChange={handleChange}
        />
        <FormField
          label="Status"
          name="status"
          type="select"
          options={["Pending", "In Progress", "Completed"]}
          value={formData.status}
          onChange={handleChange}
        />
      </div>
      <FormField
        label="Due Date"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={isLoading || isFormIncomplete}
        className={`w-full ${
          isLoading || isFormIncomplete
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        } font-semibold py-2 px-4 rounded-md`}
      >
        {isLoading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
