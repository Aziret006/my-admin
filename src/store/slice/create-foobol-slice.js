import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../../api";

export const getAdvantages = createAsyncThunk(
  "advantages/getAdvantages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Api}admin_api/advantages_list/`, {
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

export const getConstructionType = createAsyncThunk(
  "advantages/getConstructionType",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Api}admin_api/construction-type/`, {
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

export const getBranchGetId = createAsyncThunk(
  "advantages/getBranchGetId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api}admin_api/football-field/${id}/`,
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

export const createFoobolField = createAsyncThunk(
  "advantages/createFoobolField",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Api}admin_api/football_field_create/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLocationsCities = createAsyncThunk(
  "advantages/getLocationsCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Api}locations/cities/`, {
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


export const fetchAdministrators = createAsyncThunk(
  "administrators/fetchAdministrators",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Api}admin_api/administrator/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при загрузке администраторов');
    }
  }
);

export const postAdvantages = createAsyncThunk(
  "advantages/postAdvantages",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${Api}admin_api/football-field/`,
        data?.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const id = await response.data.id;
      const advantages = await data.data;
      const PATCHAdvantagesData = {
        id,
        advantages,
      };

      if (id) {
        dispatch(PATCHAdvantages(PATCHAdvantagesData));
      }

      return response.data;
    } catch (error) {

      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ error: "Network error" });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);
export const PATCHAdvantages = createAsyncThunk(
  "advantages/PATCHAdvantages",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(
        `${Api}admin_api/football-field/${data.id}/`,
        {
          advantages: data.advantages,
        },
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

export const patchAdvantages = createAsyncThunk(
  "advantages/patchAdvantages",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(
        `${Api}admin_api/football-field/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setIsUbdate(true));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const getSportComplexList = createAsyncThunk(
  "advantages/getSportComplexList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api}football_fields_api/sport-complex-types/`,
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

export const getFieldsTypeName = createAsyncThunk(
  "typeName/getFieldsTypeName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${Api}admin_api/field-type-name/`,
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

export const postCreacteFieldType = createAsyncThunk(
  "advantages/postCreacteFieldType",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${Api}admin_api/football-field-type/`,
        data[0],
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const id = await response.data.id;
      const advantages = await data[1];
      const PATCHAdvantagesData = {
        advantages,
        id,
      };


      dispatch(postCreacteFoobolField(PATCHAdvantagesData));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postCreacteFoobolField = createAsyncThunk(
  "advantages/postCreacteFoobolField",
  async (data, { rejectWithValue }) => {
    try {
      const newData = {
        price: data.advantages.price,
        schedule: data.advantages.schedule,
        advantages: data.advantages.advantages,
        construction_type: data.advantages.construction_type,
      };
      const response = await axios.put(
        `${Api}admin_api/football-field-type/${data.id}/`,
        newData,
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

export const advantagesSlice = createSlice({
  name: "advantages",
  initialState: {
    advantages: null,
    status: null,
    error: null,
    isCreate: null,
    locationsCities: null,
    creacteFoobolStatus: null,
    sportComplexList: null,
    isCreateType: null,
    idFields: null,
    fieldsIdInfo: null,
    construction: null,
    typeName: null,
    administrators: null,
    isUbdate: false
  },
  reducers: {
    setIsCreate: (state, action) => {
      state.isCreate = action.payload;
    },

    setIsUbdate: (state, action) => {
      state.isUbdate = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdvantages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAdvantages.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.advantages = action.payload;
      })
      .addCase(getAdvantages.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        console.error("Error fetching advantages:", action.payload);
      })
      .addCase(getLocationsCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLocationsCities.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.locationsCities = action.payload;
      })
      .addCase(getLocationsCities.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        console.error("Error fetching advantages:", action.payload);
      })
      .addCase(postAdvantages.pending, (state) => {
        state.creacteFoobolStatus = "loading";
        state.isCreate = true;
      })
      .addCase(postAdvantages.fulfilled, (state, action) => {
        state.creacteFoobolStatus = "fulfilled";
        state.isCreate = false;
        state.idFields = action.payload.id;
      })
      .addCase(postAdvantages.rejected, (state, action) => {
        state.creacteFoobolStatus = "rejected";
        state.error = action.payload;
        state.isCreate = false;
        console.error("Error fetching advantages:", action.payload);
      })
      .addCase(getSportComplexList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSportComplexList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.sportComplexList = action.payload;
      })
      .addCase(getSportComplexList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        console.error("Error fetching advantages:", action.payload);
      })
      .addCase(postCreacteFieldType.pending, (state) => {
        state.creacteFoobolStatus = "loading";
        state.isCreateType = true;
      })
      .addCase(postCreacteFieldType.fulfilled, (state, action) => {
        state.creacteFoobolStatus = "fulfilled";
        state.isCreateType = false;
      })
      .addCase(postCreacteFieldType.rejected, (state, action) => {
        state.creacteFoobolStatus = "rejected";
        state.error = action.payload;
        state.isCreateType = false;
        console.error("Error fetching advantages:", action.payload);
      })
      .addCase(getBranchGetId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBranchGetId.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.fieldsIdInfo = action.payload;
      })
      .addCase(getBranchGetId.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        console.error("Error fetching advantages:", action.payload);
      })
      .addCase(getConstructionType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConstructionType.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.construction = action.payload;
      })
      .addCase(getConstructionType.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        console.error("Error fetching advantages:", action.payload);
      })
      .addCase(getFieldsTypeName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFieldsTypeName.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.typeName = action.payload;
      })
      .addCase(getFieldsTypeName.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      .addCase(fetchAdministrators.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdministrators.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.administrators = action.payload;
        state.error = null;
      })
      .addCase(fetchAdministrators.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setIsCreate, setIsUbdate } = advantagesSlice.actions;
export default advantagesSlice.reducer;