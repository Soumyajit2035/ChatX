import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  userDetails: null, // Store user details here
};

export const login = createAsyncThunk("AUTH.LOGIN", async (userDetails) => {
  const response = await api.login(userDetails);

  if (response.error) {
    throw response.exception.response.data;
  } else {
    localStorage.setItem("user", JSON.stringify(response)); // Save user details in localStorage
    return response; // Return user details
  }
});

export const register = createAsyncThunk("AUTH.REGISTER", async (userDetails) => {
  const response = await api.register(userDetails);

  if (response.error) {
    throw response.exception.response.data;
  } else {
    localStorage.setItem("user", JSON.stringify(response.data.userDetails));
    return response.data.userDetails;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.userDetails = action.payload; // Store user details in Redux state
    },
    [register.fulfilled]: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = authSlice.actions;
export const authReducer = authSlice.reducer;