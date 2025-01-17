import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../api";

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (search, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("Не авторизован. Пожалуйста, войдите в систему.");
    }

    const params = {};
    if (search) {
      params.search = search;
    }
    try {
      const response = await axios.get(`${Api}user_api/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params,
      });

      if (!response.data) {
        throw new Error("Данные не получены");
      }

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        return rejectWithValue("Сессия истекла. Пожалуйста, войдите снова.");
      }
      return rejectWithValue(
        error.response?.data?.message || "Произошла ошибка при запросе"
      );
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUsers: (state) => {
      state.users = [];
    },
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setUsers, clearError, clearUsers, resetState } =
  searchSlice.actions;
export default searchSlice.reducer;
