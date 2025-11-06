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
    category: {},        // всегда держим объект: { id, name }
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
      // ====== ВСЕ ТОВАРЫ ======
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.selectedCategoryId = '';
        state.category = {}; // для общего списка категории нет
        state.loading = false;

        state.data = (Array.isArray(action.payload) ? action.payload : []).map((item) => {
          const price = Number(item.price ?? 0);
          const discont = Number(item.discountPrice ?? item.discont_price ?? 0);
          let discountPercentage = 0;

          if (price > 0 && discont > 0) {
            discountPercentage = 100 - (discont * 100) / price;
          }

          return {
            ...item,
            title: item.title ?? item.name,
            discont_price: discont,
            image: item.image, // приходит уже абсолютный URL
            discountPercentage: Number(discountPercentage.toFixed(2)),
          };
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      })

      // ====== ТОВАРЫ ПО КАТЕГОРИИ ======
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.data = [];
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';

        const payload = action.payload ?? {};

        // payload у тебя выглядит так:
        // { categoryId: "2", category: "Protective products and septic tanks", products: [...] }
        const catId =
          payload.categoryId ??
          payload.id ??
          state.selectedCategoryId ??
          '';

        // если category — строка, берём её; если объект — имя/тайтл
        const catName =
          (typeof payload.category === 'string' && payload.category) ||
          payload.category?.name ||
          payload.category?.title ||
          payload.name ||
          payload.title ||
          '';

        // ДЕРЖИМ В СТОРЕ ВСЕГДА ОБЪЕКТ { id, name }
        state.category = { id: String(catId), name: catName };

        // Берём массив продуктов
        const list = Array.isArray(payload.products)
          ? payload.products
          : (Array.isArray(payload) ? payload : []);

        state.data = list.map((p, i) => {
          const id = p.id ?? p.productId ?? p._id ?? String(i);
          const title = getProductTitle(p) || 'Untitled';
          const image = resolveProductImageUrl(p.image ?? p.thumbnail ?? p.img ?? '');
          const price = Number(p.price) || 0;
          const discont = Number(
            p.discont_price ?? p.discount_price ?? p.discountPrice ?? 0
          );

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
