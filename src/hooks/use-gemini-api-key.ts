
import { useState, useEffect } from 'react';

const GEMINI_API_KEY_STORAGE_KEY = 'gemini-api-key';

export function useGeminiApiKey() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || '';
    setApiKey(storedApiKey);
    setIsLoaded(true);
  }, []);

  const saveApiKey = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, newApiKey);
  };

  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
  };

  return {
    apiKey,
    saveApiKey,
    clearApiKey,
    isLoaded,
  };
}
