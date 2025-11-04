import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  likesData: [],
};
export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    initLikeDataFromLocalStorage: (state) => {
      const like = localStorage.getItem('like');
      if (like) {
        state.likesData = JSON.parse(like);
      }
    },

    addToWishlist: (state, action) => {        
      state.likesData.push(action.payload);
      localStorage.setItem('like', JSON.stringify(state.likesData));
    },

    removeLikeProductbyIdFromCart: (state, action) => {
        state.likesData = state.likesData.filter((product) => product.id !== action.payload);
        localStorage.setItem('like', JSON.stringify(state.likesData));
    },
  },
});

export const {
    initLikeDataFromLocalStorage,
    addToWishlist,
    removeLikeProductbyIdFromCart
} = likeSlice.actions;

export default likeSlice.reducer;
