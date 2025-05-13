import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/v1/task"
    : "https://taskify-mern-project-backend.onrender.com/api/v1/task";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/create",
        method: "POST",
        body: taskData,
      }),
    }),
    getMyTasks: builder.query({
      query: () => ({
        url: "/my-tasks",
        method: "GET",
      }),
    }),
    getTaskById: builder.query({
      // Add this endpoint
      query: (taskId) => ({
        url: `/${taskId}`,
        method: "GET",
      }),
    }),
    toggleWishlist: builder.mutation({
      query: (taskId) => ({
        url: `/${taskId}/toggle-wishlist`,
        method: "PUT",
      }),
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetMyTasksQuery,
  useGetTaskByIdQuery,
  useToggleWishlistMutation,
  useDeleteTaskMutation,
} = taskApi;
