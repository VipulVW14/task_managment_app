import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", credentials, {
    withCredentials: true,  
  });

  const { accessToken } = response.data;
  if (accessToken) {
    localStorage.setItem("token", accessToken);  
  }
  
  return response.data;
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const response = await axios.post("http://localhost:5000/api/auth/refresh", {}, { withCredentials: true });
  return response.data.accessToken;
});

// Axios interceptor to refresh token automatically
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem("token") || "" },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      state.token = "";
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice
