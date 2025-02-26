import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

const initialState = {
  status: null,
  error: null,
  user: null,
  headers: {},
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${Api}user_api/login_admin/`,
        credentials
      );
      await localStorage.setItem("token", response?.data.access_token);
      await dispatch(getUser());
      const headers = response.headers;
      const plainHeaders = {};
      Object.keys(headers).forEach((key) => {
        plainHeaders[key] = headers[key];
      });

      return { data: response.data, headers: plainHeaders };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Api}user_api/user/me/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const headers = response.headers;
      const plainHeaders = {};
      Object.keys(headers).forEach((key) => {
        plainHeaders[key] = headers[key];
      });
      return { data: response.data, headers: plainHeaders };
    } catch (error) {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        state.user = action.payload.data;
        state.headers = action.payload.headers;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload.data;
        state.headers = action.payload.headers;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
