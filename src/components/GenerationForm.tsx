
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ImageIcon, Loader2 } from 'lucide-react';
import { ImageGenerationParams } from '@/lib/replicate-api';

interface GenerationFormProps {
  onGenerate: (params: ImageGenerationParams) => void;
  isGenerating: boolean;
  apiKeyExists: boolean;
}

const GenerationForm: React.FC<GenerationFormProps> = ({ onGenerate, isGenerating, apiKeyExists }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (!apiKeyExists) {
      toast.error('Please add your Replicate API key first');
      return;
    }
    
    onGenerate({
      prompt: prompt.trim(),
    });
  };

  return (
    <Card className="w-full bg-app-card border-app-accent/30">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Generate AI Image
          </CardTitle>
          <CardDescription>
            Enter a detailed description of the image you want to create
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="A stunning landscape with mountains, lakes, and a sunset..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-secondary/50"
          />
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full flex gap-2 items-center"
            disabled={isGenerating || !prompt.trim() || !apiKeyExists}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default GenerationForm;
