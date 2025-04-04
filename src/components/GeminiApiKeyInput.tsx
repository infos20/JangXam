
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Key } from 'lucide-react';

interface GeminiApiKeyInputProps {
  apiKey: string;
  onSave: (apiKey: string) => void;
  onClear: () => void;
}

const GeminiApiKeyInput: React.FC<GeminiApiKeyInputProps> = ({ apiKey, onSave, onClear }) => {
  const [inputValue, setInputValue] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    if (!inputValue.trim()) {
      toast.error('Veuillez saisir une clé API');
      return;
    }
    
    onSave(inputValue.trim());
    toast.success('Clé API Gemini enregistrée avec succès');
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
    toast.info('Clé API Gemini effacée');
  };

  return (
    <Card className="w-full bg-app-card border-app-accent/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Clé API Google Gemini
        </CardTitle>
        <CardDescription>
          Entrez votre clé API Gemini pour générer des fiches pédagogiques. Votre clé est stockée uniquement dans le stockage local de votre navigateur.
          <a 
            href="https://makersuite.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-2 text-app-accent-light hover:underline"
          >
            Obtenir votre clé API depuis Google AI Studio →
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type={showKey ? "text" : "password"}
              placeholder="Entrez votre clé API Gemini"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pr-10 bg-secondary/50"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="destructive" 
          onClick={handleClear}
          disabled={!apiKey}
        >
          Effacer
        </Button>
        <Button 
          variant="default" 
          onClick={handleSave}
          disabled={inputValue === apiKey || !inputValue.trim()}
        >
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeminiApiKeyInput;
