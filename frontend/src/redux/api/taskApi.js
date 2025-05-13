import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/v1/task",
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
