import { useState, useEffect, useCallback } from 'react';

/**
 * Хук для загрузки данных через функцию apiFunc.
 * @param {Function} apiFunc - функция, возвращающая Promise.
 * @param {Array} deps - зависимости для повторного вызова.
 */
export function useFetch(apiFunc, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFunc()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}