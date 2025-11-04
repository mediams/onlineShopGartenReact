import { BASE_BACKEND_URL } from './env';

const toNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
};

export const getProductTitle = (product = {}) => {
  return (
    product?.name ??
    product?.title ??
    product?.productName ??
    product?.label ??
    'Product'
  );
};

export const getProductImagePath = (product = {}) => {
  return (
    product?.image ??
    product?.imageUrl ??
    product?.image_url ??
    product?.imagePath ??
    ''
  );
};

export const getProductPrice = (product = {}) => {
  return toNumber(
    product?.price ?? product?.originalPrice ?? product?.basePrice ?? product?.cost
  );
};

export const getProductDiscountPrice = (product = {}) => {
  return toNumber(
    product?.discont_price ??
      product?.discountPrice ??
      product?.discount_price ??
      product?.salePrice ??
      product?.sale_price
  );
};

export const hasProductDiscount = (price, discountPrice) => {
  return discountPrice > 0 && discountPrice < price;
};

export const getActualProductPrice = (price, discountPrice) => {
  return hasProductDiscount(price, discountPrice) ? discountPrice : price;
};

export const calculateDiscountPercentage = (price, discountPrice) => {
  if (!hasProductDiscount(price, discountPrice) || price === 0) {
    return 0;
  }

  const percentage = 100 - (discountPrice * 100) / price;
  return Math.round(percentage);
};

export const normalizeProduct = (product = {}) => {
  const title = getProductTitle(product);
  const imagePath = getProductImagePath(product);
  const price = getProductPrice(product);
  const discountPrice = getProductDiscountPrice(product);

  return {
    ...product,
    title,
    name: product?.name ?? title,
    image: imagePath,
    imageUrl: product?.imageUrl ?? imagePath,
    price,
    discont_price: discountPrice,
  };
};

export const resolveProductImageUrl = (imagePath = '') => {
  if (!imagePath) {
    return '';
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith('/')
    ? imagePath
    : `/${imagePath}`;

  return `${BASE_BACKEND_URL}${normalizedPath}`;
};