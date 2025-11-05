import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProductsByCategoryId,
  fetchProducts,
} from '../../utils/fetchClient';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    selectedCategoryId: '',
    category: {},
    data: [],
    loading: false,
    error: '',
    type: 'all',
  },
  reducers: {
    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.selectedCategoryId = '';
        state.loading = false;

        state.data = action.payload.map((item) => {
          const price = Number(item.price ?? 0);
          const discont = Number(item.discountPrice ?? 0); // с бэка: discountPrice
          let discountPercentage = 0;

          if (price > 0 && discont > 0) {
            discountPercentage = 100 - (discont * 100) / price;
          }

          return {
            // оставляем всё, что пришло
            ...item,
            // выравниваем имена под вашу карточку
            title: item.title ?? item.name,
            discont_price: discont,     // если компонент ждёт это имя
            image: item.image,          // уже полное URL по контракту DTO
            discountPercentage: Number(discountPercentage.toFixed(2)),
          };
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.category;
        state.data = action.payload.map((item, i) => {
          const id = item.id ?? item.productId ?? item._id ?? `p-${i}`;
          const price = Number(item.price) || 0;
          const discont = Number(item.discont_price ?? item.discountPrice) || 0;
          return {
            ...item,
            id,
            price,
            discont_price: discont
          };
        });
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSelectedCategoryId } = productSlice.actions;
export default productSlice.reducer;
