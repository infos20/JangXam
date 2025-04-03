
import React, { useState } from 'react';
import { Book, Calculator, Beaker, Globe, Music, PenTool, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface Subject {
  name: string;
  icon: React.ElementType;
}

const SubjectNav = () => {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  
  const subjects: Subject[] = [
    { name: 'Français', icon: Book },
    { name: 'Mathématiques', icon: Calculator },
    { name: 'Sciences', icon: Beaker },
    { name: 'Histoire-Géo', icon: Globe },
    { name: 'Arts', icon: PenTool },
    { name: 'Musique', icon: Music },
    { name: 'Éducation Civique', icon: Award },
  ];

  const handleSubjectClick = (subjectName: string) => {
    setActiveSubject(subjectName);
    toast.success(`Matière sélectionnée: ${subjectName}`);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3">Matières</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            const isActive = activeSubject === subject.name;
            
            return (
              <Button 
                key={subject.name} 
                variant={isActive ? "default" : "outline"} 
                className={`flex flex-col items-center py-3 h-auto min-w-[100px] transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => handleSubjectClick(subject.name)}
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
