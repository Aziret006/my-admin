import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../api";

// Async action to fetch balance data
export const fetchWalletBalance = createAsyncThunk(
  "walletBalance/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${Api}wallet/balance/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching data"
      );
    }
  }
);

const walletBalanceSlice = createSlice({
  name: "walletBalance",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.data = action.payload || null;
        state.loading = false;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default walletBalanceSlice.reducer;
