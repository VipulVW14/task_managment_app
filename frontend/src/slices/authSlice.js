import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", credentials, {
    withCredentials: true, // Sends cookies
  });

  localStorage.setItem("token", response.data.accessToken);
  return response.data;
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const response = await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true });
  localStorage.setItem("token", response.data.accessToken);
  return response.data.accessToken;
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: localStorage.getItem("token") || "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => { state.token = action.payload.accessToken; })
      .addCase(refreshToken.fulfilled, (state, action) => { state.token = action.payload; })
      .addCase(logoutUser.fulfilled, (state) => { state.token = ""; });
  },
});

export default authSlice.reducer;
