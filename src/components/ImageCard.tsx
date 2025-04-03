
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ImageCardProps {
  imageUrl: string;
  prompt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, prompt }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <Card className="overflow-hidden border border-border/50 bg-app-card h-full flex flex-col">
      <CardContent className="p-0 flex-grow">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt={prompt} 
            className="w-full h-full object-cover transition-all hover:scale-105 duration-300"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 bg-app-card border-t border-border/50">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {prompt}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
