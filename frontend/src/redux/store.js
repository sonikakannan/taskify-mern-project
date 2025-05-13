import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { taskApi } from "./api/taskApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, taskApi.middleware),
});
