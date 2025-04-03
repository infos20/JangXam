
import React, { useState, useEffect } from 'react';
import ApiKeyInput from '@/components/ApiKeyInput';
import GenerationForm from '@/components/GenerationForm';
import Gallery from '@/components/Gallery';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useApiKey } from '@/hooks/use-api-key';
import { generateImage, getPrediction, ImageGenerationParams, Prediction } from '@/lib/replicate-api';
import { Github } from 'lucide-react';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
}

interface LoadingImage {
  id: string;
  prompt: string;
}

const Index = () => {
  const { apiKey, saveApiKey, clearApiKey, isLoaded } = useApiKey();
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loadingImages, setLoadingImages] = useState<LoadingImage[]>([]);

  const handleGenerateImage = async (params: ImageGenerationParams) => {
    try {
      const tempId = `temp-${Date.now()}`;
      setLoadingImages(prev => [...prev, { id: tempId, prompt: params.prompt }]);
      
      // Generate the initial prediction
      const prediction = await generateImage(apiKey, params);
      
      if (prediction.error) {
        toast.error(prediction.error || 'Failed to generate image');
        setLoadingImages(prev => prev.filter(img => img.id !== tempId));
        return;
      }
      
      // Replace the temporary ID with the actual prediction ID
      setLoadingImages(prev => 
        prev.map(img => img.id === tempId ? { ...img, id: prediction.id } : img)
      );
      
      // Poll for the result
      await pollPrediction(prediction.id, params.prompt);
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(message);
      setLoadingImages(prev => prev.filter(img => img.id.startsWith('temp-')));
    }
  };

  const pollPrediction = async (id: string, prompt: string) => {
    try {
      const pollInterval = setInterval(async () => {
        const prediction = await getPrediction(apiKey, id);
        
        if (prediction.status === 'succeeded' && prediction.output) {
          clearInterval(pollInterval);
          
          // Add the generated image to our collection
          const imageUrls = Array.isArray(prediction.output) ? prediction.output : [prediction.output];
          
          imageUrls.forEach((url, index) => {
            const imageId = `${id}-${index}`;
            setImages(prev => [{
              id: imageId,
              url,
              prompt
            }, ...prev]);
          });
          
          // Remove from loading state
          setLoadingImages(prev => prev.filter(img => img.id !== id));
          toast.success('Image generated successfully!');
        } 
        else if (prediction.status === 'failed') {
          clearInterval(pollInterval);
          setLoadingImages(prev => prev.filter(img => img.id !== id));
          toast.error(prediction.error || 'Failed to generate image');
        }
      }, 1000);
      
      // Set a timeout to stop polling after 2 minutes
      setTimeout(() => {
        clearInterval(pollInterval);
        setLoadingImages(prev => {
          const stillLoading = prev.find(img => img.id === id);
          if (stillLoading) {
            toast.error('Image generation timed out. Please try again.');
            return prev.filter(img => img.id !== id);
          }
          return prev;
        });
      }, 120000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(message);
      setLoadingImages(prev => prev.filter(img => img.id !== id));
    }
  };
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-app-accent"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-app-accent to-app-accent-light inline-block text-transparent bg-clip-text">
          AI Image Generator
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create stunning images from text descriptions using Replicate's AI models.
          Simply enter your API key and start generating!
        </p>
      </header>
      
      <div className="grid gap-8 md:gap-6 md:grid-cols-2 mb-8">
        <ApiKeyInput 
          apiKey={apiKey} 
          onSave={saveApiKey} 
          onClear={clearApiKey} 
        />
        <GenerationForm 
          onGenerate={handleGenerateImage} 
          isGenerating={loadingImages.length > 0}
          apiKeyExists={!!apiKey}
        />
      </div>
      
      <Separator className="my-8" />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Your Creations</h2>
        <Gallery 
          images={images} 
          loadingImages={loadingImages}
        />
      </section>
      
      <footer className="text-center text-muted-foreground text-sm py-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <a 
            href="https://github.com/replicate/replicate"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-app-accent transition-colors inline-flex items-center gap-1"
          >
            <Github className="h-4 w-4" />
            <span>Replicate API</span>
          </a>
        </div>
        <p>Create amazing AI-generated images with Replicate's powerful models.</p>
      </footer>
    </div>
  );
};

export default Index;
