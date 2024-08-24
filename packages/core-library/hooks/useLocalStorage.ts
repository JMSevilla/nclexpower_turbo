import { useCallback } from 'react';

export function useLocalStorage<T>(key: string) {
 
  const getItem = useCallback((): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return null;
    }
  }, [key]);

  const setItem = useCallback((value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage`, error);
    }
  }, [key]);

  const removeItem = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  }, [key]);

  return { getItem, setItem, removeItem };
}


