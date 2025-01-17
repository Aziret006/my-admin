import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../api";

export const walletget = createAsyncThunk(
  "wallet/walletget",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Api}football_fields_api/booking/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(walletget.pending, (state) => {
        state.loading = true;
      })
      .addCase(walletget.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(walletget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;
