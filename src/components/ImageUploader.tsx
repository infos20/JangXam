
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  existingImages?: string[];
  onImagesChange?: (images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  existingImages = [], 
  onImagesChange 
}) => {
  const [images, setImages] = useState<string[]>(existingImages);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      
      // In a real app, we would upload the files to a server
      // Here we'll simulate an upload by creating temporary URLs
      const newImages = Array.from(e.target.files).map(file => {
        return URL.createObjectURL(file);
      });
      
      // Simulate upload delay
      setTimeout(() => {
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        
        if (onImagesChange) {
          onImagesChange(updatedImages);
        }
        
        setIsUploading(false);
        toast.success(`${newImages.length} image(s) ajoutée(s)`);
      }, 1500);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
    
    toast.success('Image supprimée');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">Supports visuels</h3>
        <label htmlFor="upload-image">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            disabled={isUploading} 
            className="cursor-pointer"
            asChild
          >
            <div>
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-transparent border-t-foreground animate-spin" />
                  <span>Chargement...</span>
                </div>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Ajouter des images
                </>
              )}
            </div>
          </Button>
        </label>
        <input 
          type="file" 
          id="upload-image" 
          accept="image/*" 
          multiple 
          className="sr-only" 
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>

      {images.length === 0 ? (
        <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center text-muted-foreground">
          <ImageIcon className="h-10 w-10 mb-2" />
          <p className="text-sm">Aucune image ajoutée</p>
          <p className="text-xs">Ajoutez des images pour illustrer votre leçon</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative">
                <img 
                  src={src} 
                  alt={`Support visuel ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => handleDeleteImage(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <CardContent className="p-2">
                <p className="text-xs truncate">Image {index + 1}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
