import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../api";

export const fetchUbdateFields = createAsyncThunk(
  "ubdateFields/fetchUbdateFields",
  async (data, { rejectWithValue }) => {

    console.log(data)

    try {
      const response = await axios.put(
        `${Api}admin_api/football-field-type/${data.id}/`,
        data?.two,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const ubdateFields = createSlice({
  name: "ubdateFields",
  initialState: {
    ubdate: null,
    error: null,
    loading: false,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUbdateFields.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUbdateFields.fulfilled, (state, action) => {
        state.ubdate = action.payload;
        state.loading = false;
      })
      .addCase(fetchUbdateFields.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = "rejected";
      });
  },
});


export default ubdateFields.reducer;