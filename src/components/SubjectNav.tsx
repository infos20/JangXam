
import React, { useState } from 'react';
import { Book, Calculator, Beaker, Globe, Music, PenTool, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface Subject {
  name: string;
  icon: React.ElementType;
}

interface SubjectNavProps {
  onSubjectSelect?: (subjectName: string | null) => void;
}

const SubjectNav = ({ onSubjectSelect }: SubjectNavProps) => {
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
