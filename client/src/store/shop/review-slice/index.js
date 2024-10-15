// import dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initail State
const initialState = {
  isLoading: false,
  reviews: [],
};

// add review thunk
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      formData
    );

    return response.data;
  }
);

// get review thunk
export const getReview = createAsyncThunk("/order/getReview", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/shop/review/${id}`
  );

  return response.data;
});

const searchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action?.payload?.data;
      })
      .addCase(getReview.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default searchSlice.reducer;
