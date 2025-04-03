
import React from 'react';
import ImageCard from './ImageCard';
import LoadingImageCard from './LoadingImageCard';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ImagesIcon } from 'lucide-react';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
}

interface GalleryProps {
  images: GeneratedImage[];
  loadingImages: { id: string; prompt: string }[];
}

const Gallery: React.FC<GalleryProps> = ({ images, loadingImages }) => {
  if (images.length === 0 && loadingImages.length === 0) {
    return (
      <Card className="w-full bg-app-card border-border/50 text-center py-12">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2 text-muted-foreground">
            <ImagesIcon className="h-5 w-5" />
            No Images Yet
          </CardTitle>
          <CardDescription>
            Generate your first image using the form above
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="image-grid">
      {loadingImages.map((img) => (
        <LoadingImageCard key={img.id} prompt={img.prompt} />
      ))}
      {images.map((image) => (
        <ImageCard key={image.id} imageUrl={image.url} prompt={image.prompt} />
      ))}
    </div>
  );
};

export default Gallery;
