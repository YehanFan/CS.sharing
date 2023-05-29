import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import readingListsService from "./readingListsService";

const initialState = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create a reading list
export const createReadingList = createAsyncThunk(
  "createReadingList",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await readingListsService.createReadingList(userData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add a reading list item to a list
export const addReadingListItem = createAsyncThunk(
  "addReadingListItem",
  async (itemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await readingListsService.addReadingListItem(itemData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get reading lists
export const getReadingLists = createAsyncThunk(
  "getReadingLists",
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await readingListsService.getReadingLists(username, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete reading list
export const deleteReadingList = createAsyncThunk(
  "deleteReadingList",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await readingListsService.deleteReadingList(userData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const readingListsSlice = createSlice({
  name: "readingLists",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReadingLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReadingLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(getReadingLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.items = [];
      })
      .addCase(createReadingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReadingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = [...state.items, action.payload];
      })
      .addCase(createReadingList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.items = [];
      })
      .addCase(deleteReadingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReadingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = [...state.items].filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteReadingList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = readingListsSlice.actions;
export default readingListsSlice.reducer;
