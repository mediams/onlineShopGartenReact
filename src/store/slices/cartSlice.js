import { createSlice } from '@reduxjs/toolkit';

const updateLocalStorage = (cartData) => {
  localStorage.setItem('cart', JSON.stringify(cartData));
};
const initialState = {
  cartData: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initDataFromLocalStorage: (state) => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        state.cartData = JSON.parse(cart);
      }
    },

    addToCart: (state, action) => {
      let foundProduct = state.cartData.find(
        (product) => product.id === action.payload.id
      );

      if (foundProduct) {
        state.cartData = state.cartData.map((product) =>
          product.id === action.payload.id
            ? { ...product, count: product.count + 1 }
            : product
        );
      } else {
        state.cartData.push({ ...action.payload, count: 1 });
      }

      updateLocalStorage(state.cartData);
    },
    addToCartByAmount: (state, action) => {
      const { id, count } = action.payload;
      const foundProduct = state.cartData.find((product) => product.id === id);

      if (foundProduct) {
        foundProduct.count += count;
      } else {
        state.cartData.push({ ...action.payload });
      }
      updateLocalStorage(state.cartData);
    },
    removeAllProductbyIdFromCart: (state, action) => {
      let foundProduct = state.cartData.find(
        (product) => product.id === action.payload
      );

      if (foundProduct) {
        state.cartData = state.cartData
          .map((product) => {
            if (product.id === action.payload) {
              product.count = 0;

              if (product.count === 0) {
                return null;
              }
            }
            return product;
          })
          .filter((product) => product);
      }

      updateLocalStorage(state.cartData);
    },

    removeItemFromCart: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.id !== action.payload.id
      );
      updateLocalStorage(state.cartData);
    },

    increaseCountInCartItem: (state, action) => {
      let currData = state.cartData.map((item) => ({ ...item }));
      let tempItem = state.cartData.find((item) => item.id === +action.payload);
      tempItem = { ...tempItem, count: tempItem.count + 1 };
      state.cartData = currData.map((item) =>
        item.id === +action.payload ? tempItem : item
      );

      updateLocalStorage(state.cartData);
    },

    decreaseCountInCartItem: (state, action) => {
      let currData = state.cartData.map((item) => ({ ...item }));
      let tempItem = state.cartData.find((item) => item.id === +action.payload);
      tempItem = { ...tempItem, count: tempItem.count - 1 };
      state.cartData = currData.map((item) =>
        item.id === +action.payload ? tempItem : item
      );

      updateLocalStorage(state.cartData);
    },
    removeAllItemsFromCart: (state) => {
      state.cartData = [];
      updateLocalStorage(state.cartData);
    },
  },
});

export const {
  addToCart,
  initDataFromLocalStorage,
  removeAllProductbyIdFromCart,
  removeItemFromCart,
  increaseCountInCartItem,
  decreaseCountInCartItem,
  addToCartByAmount,
  removeAllItemsFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
