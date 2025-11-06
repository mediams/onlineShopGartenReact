import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ORIGIN, API_PREFIX } from './env';
import { normalizeProduct, resolveProductImageUrl } from './productUtils';

// Универсальный fetch с безопасной сборкой URL и вменяемыми ошибками
async function apiFetch(path, options = {}) {
  // Надёжно собираем адрес: new URL сам разрулит слэши
  const url = new URL(`${API_PREFIX}${path}`, API_ORIGIN).toString();

  const res = await fetch(url, {
    // добавляй credentials: 'include' если нужны куки
    headers: {
      ...(options.headers || {}),
    },
    ...options,
  });

  async function getCategoryById(categoryId) {
  // допустим, бэкенд: GET /categories/:id => { id, name, products: [...] }
  const raw = await apiFetch(`/categories/${categoryId}`);
  const products = (raw.products ?? []).map(p => {
    const norm = normalizeProduct({
      ...p,
      id: p.id ?? p.productId ?? p._id,
    });
    return { 
      ...norm, 
      image: resolveProductImageUrl(norm.image) 
    };
  });

  return {
    category: {
      id: raw.id ?? categoryId,
      name: raw.name ?? raw.title ?? `Category ${categoryId}`,
      title: raw.title ?? raw.name
    },
    products,
  };
}

  // На случай 204 No Content
  if (res.status === 204) return null;

  const ct = res.headers.get('content-type') || '';

  // Если это не JSON — кинем подробную ошибку с кусочком ответа
  if (!ct.includes('application/json')) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `Ожидали JSON, получили ${res.status} ${ct}. URL: ${res.url}. Фрагмент: ${text.slice(0, 200)}`
    );
  }

  // Если статус не ок — попробуем вытащить тело-ошибку
  if (!res.ok) {
    let errBody = '';
    try { errBody = JSON.stringify(await res.json()); } catch (_) {}
    throw new Error(`HTTP ${res.status} ${res.statusText}. ${errBody}`);
  }

  return res.json();
}

// ====== ЧИСТЫЕ API-ФУНКЦИИ ======
export const getAllCategories = () => apiFetch('/categories');

export const getCategoryById = (id) => apiFetch(`/categories/${id}`);

export const getAllProducts = () => apiFetch('/products/all');

export const getProductById = (id) => apiFetch(`/products/${id}`);

export const sendForSale = (data) =>
  apiFetch('/sale/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const sendForOrder = (data) =>
  apiFetch('/order/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

// ====== THUNKS (если они нужны именно здесь) ======
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (type) => {
    const data = await getAllProducts();
    const list = Array.isArray(data) ? data : (data?.content ?? []);
    return type === 'all'
      ? list
      : list.filter((item) => Number(item.discountPrice) > 0);
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const raw = await getAllCategories();
    const list = Array.isArray(raw) ? raw : (raw?.content ?? raw?.items ?? []);

    const normalize = (item, i) => ({
      id:
        item?.id ??
        item?._id ??
        item?.categoryId ??
        item?.slug ??
        `cat-${i}`,
      name:
        item?.name ??
        item?.category ??
        item?.categoryName ??
        item?.title ??
        item?.attributes?.name ??
        item?.translations?.de?.name ??
        item?.translations?.en?.name ??
        'Without Name',
      imageUrl:
        item?.imageUrl ??
        item?.image ??
        item?.attributes?.imageUrl ??
        item?.image_path ??
        '',
    });

    return list.map(normalize);
  }
);

export const fetchProductsByCategoryId = createAsyncThunk(
  'product/fetchProductsByCategoryId',
  async (categoryId) => getCategoryById(categoryId)
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id) => getProductById(id)
);
