
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Key } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  onSave: (apiKey: string) => void;
  onClear: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onSave, onClear }) => {
  const [inputValue, setInputValue] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    if (!inputValue.trim()) {
      toast.error('Please enter an API key');
      return;
    }
    
    onSave(inputValue.trim());
    toast.success('API key saved successfully');
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
    toast.info('API key cleared');
  };

  return (
    <Card className="w-full bg-app-card border-app-accent/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Replicate API Key
        </CardTitle>
        <CardDescription>
          Enter your Replicate API key to generate images. Your key is stored only in your browser's local storage.
          <a 
            href="https://replicate.com/account/api-tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-2 text-app-accent-light hover:underline"
          >
            Get your API key from Replicate →
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type={showKey ? "text" : "password"}
              placeholder="Enter your Replicate API key"
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
          Clear
        </Button>
        <Button 
          variant="default" 
          onClick={handleSave}
          disabled={inputValue === apiKey || !inputValue.trim()}
        >
          Save Key
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyInput;
