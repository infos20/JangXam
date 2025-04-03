
import { useState, useEffect } from 'react';

const API_KEY_STORAGE_KEY = 'replicate-api-key';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY) || '';
    setApiKey(storedApiKey);
    setIsLoaded(true);
  }, []);

  const saveApiKey = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem(API_KEY_STORAGE_KEY, newApiKey);
  };

  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  };

  return {
    apiKey,
    saveApiKey,
    clearApiKey,
    isLoaded,
  };
}
