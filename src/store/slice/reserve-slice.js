import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

export const fetchReverse = createAsyncThunk(
  "reserve/fetchReverse",
  async ({ footballId, startDate }, { rejectWithValue }) => {
    const formattedDate = (date) => moment(date).format("YYYY-MM-DD");
   
    const date = formattedDate(startDate);
    try {
      const { data } = await axios.get(
        `${Api}football_fields_api/field-booked-hours/${date}/${footballId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchbookingCreate = createAsyncThunk(
  "reserve/fetchbookingCreate",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${Api}admin_api/admin-booking-field/?user_type=${data?.booking}`,
        data?.data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Запись успешно создана");
      return response.data;
    } catch (error) {
      toast.error("Запись не создана");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const reserveSlice = createSlice({
  name: "reserve",
  initialState: {
    loading: false,
    reverse: null,
    booking: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReverse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReverse.fulfilled, (state, action) => {
        state.reverse = action.payload;
        state.loading = false;
      })
      .addCase(fetchReverse.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchbookingCreate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchbookingCreate.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.loading = false;
      })
      .addCase(fetchbookingCreate.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default reserveSlice.reducer;
