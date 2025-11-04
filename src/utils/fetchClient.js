import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_BACKEND_URL } from './env';
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/categories/all`);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/categories/${id}`);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/products/all`);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const sendForSale = async (data) => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/sale/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const sendForOrder = async (data) => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/order/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (type) => {
    const response = await fetch(`${BASE_BACKEND_URL}/products/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch!' + response.statusText);
    }
    let data = await response.json();
    if (type === 'all') {
      return data;
    } else {
      return data.filter((item) => item.discont_price > 0);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetch(`${BASE_BACKEND_URL}/categories/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch!' + response.statusText);
    }

    let data = await response.json();
    return data;
  }
);

export const fetchProductsByCategoryId = createAsyncThunk(
  'product/fetchProductsByCategoryId',
  async (categoryId) => {
    const response = await fetch(
      `${BASE_BACKEND_URL}/categories/${categoryId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch!' + response.statusText);
    }

    let data = await response.json();
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetch(`${BASE_BACKEND_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch!' + response.statusText);
    }

    let data = await response.json();
    return data;
  }
);
