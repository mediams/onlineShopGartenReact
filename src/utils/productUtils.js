// utils/productUtils.js
import { BASE_BACKEND_URL } from './env';

const toNumber = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

// ---------- getters ----------
export const getProductId = (p = {}, fallback) =>
  p.id ?? p.productId ?? p._id ?? fallback;

export const getProductTitle = (p = {}) =>
  p.title ?? p.name ?? p.productName ?? p.label ?? 'Product';

export const getProductImagePath = (p = {}) =>
  p.image ?? p.imageUrl ?? p.image_url ?? p.imagePath ?? '';

export const getProductPrice = (p = {}) =>
  toNumber(p.price ?? p.originalPrice ?? p.basePrice ?? p.cost);

export const getProductDiscountPrice = (p = {}) =>
  toNumber(
    p.discont_price ??
      p.discountPrice ??
      p.discount_price ??
      p.salePrice ??
      p.sale_price
  );

// ---------- helpers ----------
export const hasProductDiscount = (price, discountPrice) =>
  discountPrice > 0 && discountPrice < price;

export const getActualProductPrice = (price, discountPrice) =>
  hasProductDiscount(price, discountPrice) ? discountPrice : price;

export const calculateDiscountPercentage = (price, discountPrice) => {
  if (!hasProductDiscount(price, discountPrice) || price === 0) return 0;
  return Math.round(100 - (discountPrice * 100) / price);
};

export const resolveProductImageUrl = (imagePath = '') => {
  if (!imagePath) return '';
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${BASE_BACKEND_URL}${normalizedPath}`;
};

// ---------- единая форма товара ----------
export const normalizeProduct = (p = {}, index = 0) => {
  const id = getProductId(p, String(index));
  const title = getProductTitle(p);
  const imagePath = getProductImagePath(p);
  const price = getProductPrice(p);
  const discont_price = getProductDiscountPrice(p);

  return {
    ...p,
    id,
    title,
    name: p.name ?? title,
    image: imagePath,                 // «сырой» путь
    imageUrl: p.imageUrl ?? imagePath,
    price,
    discont_price,
  };
};

// Полная нормализация + абсолютный URL картинок
export const ensureProductShape = (p = {}, index = 0) => {
  const base = normalizeProduct(p, index);
  return {
    ...base,
    image: resolveProductImageUrl(base.image),
  };
};
