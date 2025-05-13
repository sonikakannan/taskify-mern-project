import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export const fetchUser = () => async (dispatch) => {
  try {
    const result = await authApi.endpoints.getMe.initiate();
    if (result.data) {
      dispatch(setUser(result.data));
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
};

export default authSlice.reducer;
