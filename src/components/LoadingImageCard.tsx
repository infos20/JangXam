
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface LoadingImageCardProps {
  prompt: string;
}

const LoadingImageCard: React.FC<LoadingImageCardProps> = ({ prompt }) => {
  return (
    <Card className="overflow-hidden border border-border/50 bg-app-card h-full flex flex-col">
      <CardContent className="p-0 flex-grow">
        <div className="aspect-square relative overflow-hidden bg-muted/30 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-app-accent animate-spin" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 bg-app-card border-t border-border/50">
        <p className="text-sm text-muted-foreground line-clamp-2 animate-pulse-gentle">
          {prompt}
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoadingImageCard;
