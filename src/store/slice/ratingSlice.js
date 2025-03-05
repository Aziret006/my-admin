import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api } from '../../api';

export const fetchRating = createAsyncThunk(
  'rating/fetchRating',
  async ({ fieldId, days }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Api}football_fields_api/analytics/rating/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          field_id: fieldId,
          days,
        },
      });
      console.log(response.data, "response.data");
      return response.data;      
    } catch (error) {
      console.error("Error fetching analytics rating:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const ratingSlice = createSlice({
  name: 'rating',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRating.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ratingSlice.reducer;
