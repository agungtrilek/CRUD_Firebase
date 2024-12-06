import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://auth-project-ce098-default-rtdb.firebaseio.com";

type Item = {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

type CrudState = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

const initialState: CrudState = {
  items: [],
  loading: false,
  error: null,
};

// Thunk actions
export const fetchItems = createAsyncThunk("crud/fetchItems", async () => {
  const response = await axios.get(`${BASE_URL}/items.json`);
  const data = response.data;
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
});

export const createItem = createAsyncThunk(
  "crud/createItem",
  async (item: Item) => {
    const response = await axios.post(`${BASE_URL}/items.json`, item);
    return { id: response.data.name, ...item };
  }
);

export const updateItem = createAsyncThunk(
  "crud/updateItem",
  async (item: Item) => {
    await axios.put(`${BASE_URL}/items/${item.id}.json`, item);
    return item;
  }
);

export const deleteItem = createAsyncThunk(
  "crud/deleteItem",
  async (id: string) => {
    await axios.delete(`${BASE_URL}/items/${id}.json`);
    return id;
  }
);

// Slice
const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default crudSlice.reducer;
