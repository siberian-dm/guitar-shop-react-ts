import axios, { AxiosError } from 'axios';
import { useState } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */

export const useFetch = (
  callback: (...args: any[]) => Promise<void>,
): [(...args: any[]) => Promise<void>, boolean, AxiosError | null] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetching = async (...args: any[]) => {
    try {
      setError(null);
      setIsLoading(true);
      await callback(...args);
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
