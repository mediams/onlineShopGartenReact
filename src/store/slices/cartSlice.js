import { createSlice } from '@reduxjs/toolkit';
import { ensureProductShape } from '../../utils/productUtils';

const save = (data) => localStorage.setItem('cart', JSON.stringify(data));

const initialState = { cartData: [] };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initDataFromLocalStorage: (state) => {
      const raw = localStorage.getItem('cart');
      if (raw) {
        const arr = JSON.parse(raw);
        // Нормализуем все старые элементы (починит undefined)
        state.cartData = Array.isArray(arr)
          ? arr.map((p, i) => ensureProductShape(p, i))
          : [];
      }
    },

    // +1 к количеству или новый товар
    addToCart: (state, action) => {
      const incoming = ensureProductShape(action.payload);
      const found = state.cartData.find(p => String(p.id) === String(incoming.id));
      if (found) found.count = (found.count || 1) + 1;
      else state.cartData.push({ ...incoming, count: 1 });
      save(state.cartData);
    },

    // добавить конкретное количество
    addToCartByAmount: (state, action) => {
      const incoming = ensureProductShape(action.payload);
      const qty = Number(incoming.count) || 1;
      const found = state.cartData.find(p => String(p.id) === String(incoming.id));
      if (found) found.count = (found.count || 1) + qty;
      else state.cartData.push({ ...incoming, count: qty });
      save(state.cartData);
    },

    removeAllProductbyIdFromCart: (state, action) => {
      const id = String(action.payload);
      state.cartData = state.cartData.filter(p => String(p.id) !== id);
      save(state.cartData);
    },

    removeItemFromCart: (state, action) => {
      const id = String(action.payload.id ?? action.payload);
      state.cartData = state.cartData.filter(i => String(i.id) !== id);
      save(state.cartData);
    },

    increaseCountInCartItem: (state, action) => {
      const id = String(action.payload);
      state.cartData = state.cartData.map(it =>
        String(it.id) === id ? { ...it, count: (it.count || 1) + 1 } : it
      );
      save(state.cartData);
    },

    decreaseCountInCartItem: (state, action) => {
      const id = String(action.payload);
      state.cartData = state.cartData
        .map(it => (String(it.id) === id ? { ...it, count: (it.count || 1) - 1 } : it))
        .filter(it => it.count > 0);
      save(state.cartData);
    },

    removeAllItemsFromCart: (state) => {
      state.cartData = [];
      save(state.cartData);
    },
  },
});

export const {
  initDataFromLocalStorage,
  addToCart,
  addToCartByAmount,
  removeAllProductbyIdFromCart,
  removeItemFromCart,
  increaseCountInCartItem,
  decreaseCountInCartItem,
  removeAllItemsFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
