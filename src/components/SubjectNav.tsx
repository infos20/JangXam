
import React, { useState } from 'react';
import { Book, Calculator, Beaker, Globe, Music, PenTool, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface Subject {
  name: string;
  icon: React.ElementType;
  count?: number;
}

interface SubjectNavProps {
  onSubjectSelect?: (subjectName: string | null) => void;
}

const SubjectNav = ({ onSubjectSelect }: SubjectNavProps) => {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  
  const subjects: Subject[] = [
    { name: 'Français', icon: Book, count: 2 },
    { name: 'Mathématiques', icon: Calculator, count: 1 },
    { name: 'Sciences', icon: Beaker, count: 2 },
    { name: 'Histoire-Géo', icon: Globe, count: 0 },
    { name: 'Arts', icon: PenTool, count: 0 },
    { name: 'Musique', icon: Music, count: 1 },
    { name: 'Éducation Civique', icon: Award, count: 0 },
  ];

  const handleSubjectClick = (subjectName: string) => {
    // If clicking the already active subject, deselect it
    const newActiveSubject = activeSubject === subjectName ? null : subjectName;
    
    setActiveSubject(newActiveSubject);
    
    if (onSubjectSelect) {
      onSubjectSelect(newActiveSubject);
    }
    
    if (newActiveSubject) {
      toast.success(`Matière sélectionnée: ${newActiveSubject}`);
    } else {
      toast.info('Toutes les matières affichées');
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Matières</h2>
        {activeSubject && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSubjectClick(activeSubject)}
            className="text-sm"
          >
            Réinitialiser le filtre
          </Button>
        )}
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            const isActive = activeSubject === subject.name;
            
            return (
              <Button 
                key={subject.name} 
                variant={isActive ? "default" : "outline"} 
                className={`flex flex-col items-center py-3 h-auto min-w-[100px] transition-colors relative ${
                  isActive ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => handleSubjectClick(subject.name)}
              >
                <Icon className="mb-1 h-5 w-5" />
                <span className="text-sm">{subject.name}</span>
                {typeof subject.count !== 'undefined' && subject.count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`absolute -top-2 -right-2 ${isActive ? 'bg-primary-foreground text-primary' : ''}`}
                  >
                    {subject.count}
                  </Badge>
                )}
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
