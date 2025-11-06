import { useEffect, useState } from 'react';
import { getProductById } from './fetchClient';
import { normalizeProduct, resolveProductImageUrl } from './productUtils';

export default function useFetchDetails(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    if (!productId) return;

    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');

        // 1) получаем товар
        const raw = await getProductById(productId); // /products/:id

        // 2) нормализуем имена полей под твоё приложение
        const norm = normalizeProduct({
          ...raw,
          id: raw?.id ?? raw?.productId ?? raw?._id ?? String(productId),
        });

        // 3) достраиваем абсолютный URL картинки, если пришёл относительный
        const image = resolveProductImageUrl(norm.image);
        const ready = { ...norm, image };

        if (isMounted) setProduct(ready);
      } catch (e) {
        if (isMounted) setError(e.message ?? 'Failed to load product');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [productId]);

  return { product, loading, error };
}
