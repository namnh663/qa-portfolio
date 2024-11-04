import { useState, useEffect } from 'react';

const useFetch = (fetchFunction, param) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const result = await fetchFunction(param);
        if (result && result.length === 0) {
          // Handle empty data case
          setError('Not found');
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, param]);

  return { data, loading, error };
};

export default useFetch;