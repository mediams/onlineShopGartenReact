import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProductsByCategoryId,
  fetchProducts,
} from '../../utils/fetchClient';
import { getProductTitle, resolveProductImageUrl } from '../../utils/productUtils';


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
        state.data = [];
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';

        // если thunk возвращает { category, products }
        if (action.payload && action.payload.products) {
          state.category = action.payload.category || {};
          state.data = action.payload.products.map((p, i) => {
            const id = p.id ?? p.productId ?? p._id ?? String(i);
            const title = getProductTitle(p) || 'Untitled';
            const image = resolveProductImageUrl(p.image ?? p.thumbnail ?? p.img ?? '');
            const price = Number(p.price) || 0;
            const discont = Number(p.discont_price ?? p.discount_price ?? p.discountedPrice) || 0;

            return { id, title, image, price, discont_price: discont };
          });
          return;
        }

        // если thunk возвращает массив продуктов (старый вариант)
        state.category = action.payload.category || state.category || {};
        state.data = (Array.isArray(action.payload) ? action.payload : []).map((p, i) => {
          const id = p.id ?? p.productId ?? p._id ?? String(i);
          const title = getProductTitle(p) || 'Untitled';
          const image = resolveProductImageUrl(p.image ?? p.thumbnail ?? p.img ?? '');
          const price = Number(p.price) || 0;
          const discont = Number(p.discont_price ?? p.discount_price ?? p.discountedPrice) || 0;

          return { id, title, image, price, discont_price: discont };
        });
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load category';
      });
      
  },
});
export const { setSelectedCategoryId } = productSlice.actions;
export default productSlice.reducer;
