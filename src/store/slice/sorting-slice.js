import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../api";

export const getBookings = createAsyncThunk(
  "sorting/getBookings",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api}football_fields_api/booking/?start=${startDate}&end=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sortingSlice = createSlice({
  name: "sorting",
  initialState: {
    loading: false,
    sortedData: [],
    error: null,
  },
  reducers: {
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    setSortedData: (state, action) => {
      state.sortedData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.sortedData = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSortConfig, setSortedData } = sortingSlice.actions;
export default sortingSlice.reducer;
