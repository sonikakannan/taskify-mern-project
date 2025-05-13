import React, { useState } from "react";
import { useCreateTaskMutation } from "../redux/api/taskApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/createTask/TaskForm";

const CreateTaskPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    status: "",
  });
  const [subTasks, setSubTasks] = useState([""]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [createTask, { isLoading, isSuccess, isError }] =
    useCreateTaskMutation();

  const handleFormSubmit = async (data) => {
    setFormSubmitted(true);
    try {
      await createTask(data).unwrap();
      toast.success("Task created successfully");
      navigate("/manage-tasks");
      setFormData({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        status: "",
      });
      setSubTasks([""]);
      setFormSubmitted(false);
    } catch (err) {
      console.error("Task creation failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-md shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Task
        </h2>
        <TaskForm
          formData={formData}
          setFormData={setFormData}
          subTasks={subTasks}
          setSubTasks={setSubTasks}
          handleFormSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateTaskPage;
