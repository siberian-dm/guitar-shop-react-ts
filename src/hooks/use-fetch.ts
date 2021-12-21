import axios, { AxiosError } from 'axios';
import { createAPI } from '../services/api';
import { useEffect, useState } from 'react';

const api = createAPI();

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await api.get(url);
        setData(response.data);
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        }
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setError(null);
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
