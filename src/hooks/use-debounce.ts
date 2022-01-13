import { useEffect, useState } from 'react';

export const DEBOUNCE_DELAY = 600;

const useDebounce = <T>(value: T): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
