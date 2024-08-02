import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../api";
import axios from "axios";
import { fetchBookings } from "./story";
import { toast, ToastContainer } from "react-toastify";

export const fetchFields = createAsyncThunk(
  "fields/fetchFields",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${Api}admin_api/football-field/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setFieldsId(response.data[0].id));
      dispatch(fetchFieldsIdList(response.data[0].id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFieldsDelete = createAsyncThunk(
  "fields/fetchFieldsDelete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${Api}admin_api/football-field/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Поле успешно удалена");
      dispatch(fetchFields());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFieldsTypeDelete = createAsyncThunk(
  "fields/fetchFieldsTypeDelete",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${Api}admin_api/football-field-type/${data?.footballId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Тип полей успешно удален");
      dispatch(fetchFieldsIdList(data?.id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFieldsIdList = createAsyncThunk(
  "fields/fetchFieldsIdList",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${Api}admin_api/football-field/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data?.football_field_type?.length > 0) {
        dispatch(setFootballId(response?.data?.football_field_type[0]?.id));
        dispatch(
          fetchFieldsIdDetail(response?.data?.football_field_type[0]?.id)
        );
        dispatch(fetchBookings(response?.data?.football_field_type[0]?.id));
        dispatch(setSelectValue(response?.data?.football_field_type[0]?.name));
      } else {
        dispatch(setFieldsIdDetail(null));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// export const setFieldsId1 = createAsyncThunk(
//   "fields/setFieldsId",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${Api}admin_api/football-field/${id}/`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const fetchFieldsIdDetail = createAsyncThunk(
  "fields/fetchFieldsIdDetail",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const detail = await axios.get(
        `${Api}admin_api/football-field-type/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const comments = await axios.get(
        `${Api}admin_api/football_field_type_comments/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const response = {
        detail: detail.data,
        comments: comments.data,
      };
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fieldsSlice = createSlice({
  name: "fields",
  initialState: {
    loading: false,
    error: null,
    fields: null,
    fieldsId: null,
    selectValue: null,
    footballId: null,
    fieldsIdList: null,
    fieldsIdDetail: null,
    fieldsComments: null,
  },

  reducers: {
    setFieldsId: (state, action) => {
      state.fieldsId = action.payload;
    },
    setSelectValue: (state, action) => {
      state.selectValue = action.payload;
    },
    setFootballId: (state, action) => {
      state.footballId = action.payload;
    },

    setFieldsIdDetail: (state, action) => {
      state.fieldsIdDetail = action.payload;
      state.fieldsComments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFields.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFields.fulfilled, (state, action) => {
        state.loading = false;
        state.fields = action.payload;
      })
      .addCase(fetchFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFieldsIdList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFieldsIdList.fulfilled, (state, action) => {
        state.loading = false;
        state.fieldsIdList = action.payload;
      })
      .addCase(fetchFieldsIdList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFieldsIdDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFieldsIdDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.fieldsIdDetail = action.payload.detail;
        state.fieldsComments = action.payload.comments;
      })
      .addCase(fetchFieldsIdDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFieldsId, setSelectValue, setFootballId, setFieldsIdDetail } =
  fieldsSlice.actions;
export default fieldsSlice.reducer;
