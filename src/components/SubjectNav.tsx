
import React from 'react';
import { Book, Calculator, Beaker, Globe, Music, PenTool, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Subject {
  name: string;
  icon: React.ElementType;
}

const SubjectNav = () => {
  const subjects: Subject[] = [
    { name: 'Français', icon: Book },
    { name: 'Mathématiques', icon: Calculator },
    { name: 'Sciences', icon: Beaker },
    { name: 'Histoire-Géo', icon: Globe },
    { name: 'Arts', icon: PenTool },
    { name: 'Musique', icon: Music },
    { name: 'Éducation Civique', icon: Award },
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3">Matières</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Button 
                key={subject.name} 
                variant="outline" 
                className="flex flex-col items-center py-3 h-auto min-w-[100px]"
              >
                <Icon className="mb-1 h-5 w-5" />
                <span className="text-sm">{subject.name}</span>
              </Button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default SubjectNav;
