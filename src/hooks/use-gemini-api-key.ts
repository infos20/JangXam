
import { useState, useEffect } from 'react';

const GEMINI_API_KEY_STORAGE_KEY = 'gemini-api-key';

export function useGeminiApiKey() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Vérifier si l'application s'exécute dans un navigateur avant d'accéder au localStorage
    if (typeof window !== 'undefined') {
      const storedApiKey = localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || '';
      setApiKey(storedApiKey);
      setIsLoaded(true);
    }
  }, []);

  const saveApiKey = (newApiKey: string) => {
    setApiKey(newApiKey);
    if (typeof window !== 'undefined') {
      localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, newApiKey);
    }
  };

  const clearApiKey = () => {
    setApiKey('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
    }
  };

  return {
    apiKey,
    saveApiKey,
    clearApiKey,
    isLoaded,
  };
}
