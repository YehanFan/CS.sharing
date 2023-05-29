import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import suggestedUsersService from "./suggestedUsersService";

const initialState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get suggested users
export const getSuggestedUsers = createAsyncThunk(
  "getSuggestedUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await suggestedUsersService.getSuggestedUsers(token);
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

const suggestedUsersSlice = createSlice({
  name: "suggestedUsers",
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
      .addCase(getSuggestedUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuggestedUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getSuggestedUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.users = [];
      });
  },
});

export const { reset } = suggestedUsersSlice.actions;
export default suggestedUsersSlice.reducer;
