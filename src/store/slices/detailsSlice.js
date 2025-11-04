import { createSlice } from '@reduxjs/toolkit';
import { fetchProductById } from '../../utils/fetchClient';

export const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    details: {},
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { increment, decrement } = detailsSlice.actions;
export default detailsSlice.reducer;
