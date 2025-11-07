export const BASE_BACKEND_URL = 'onlineshopgarden-production.up.railway.app/api';
// ВАРИАНТ 1: жёстко задать продовый и дев URL-ы
export const API_ORIGIN =
  (import.meta?.env?.VITE_API_URL) // если используешь Vite-ENV
  || 'https://onlineshopgarden.onrender.com/'; // <- С ПРОТОКОЛОМ https
  // || 'http://localhost:8080/api'; // <- С ПРОТОКОЛОМ https

export const API_PREFIX = '/api'; // чтобы было /api/categories и т.д.

// export const BASE_BACKEND_URL = 'http://localhost:8080/api';