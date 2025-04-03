
import React, { useState, useEffect } from 'react';
import Clock from '@/components/Clock';
import SubjectNav from '@/components/SubjectNav';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [savedLessons, setSavedLessons] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Example data - in a real app, this would come from your API
    setSavedLessons([
      { id: 1, title: 'Introduction à la Lecture', subject: 'Français', level: 'CP', date: '2025-04-01' },
      { id: 2, title: 'Les Nombres de 1 à 10', subject: 'Mathématiques', level: 'CI', date: '2025-04-02' },
      { id: 3, title: 'Le Corps Humain', subject: 'Sciences', level: 'CE1', date: '2025-04-03' },
    ]);
  }, []);

  const handleCreateLesson = () => {
    navigate('/create-lesson');
  };

  const handleOpenLesson = (id: number) => {
    navigate(`/lesson/${id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <p className="text-muted-foreground">Bienvenue dans votre espace pédagogique</p>
        </div>
        <Clock />
      </header>

      <Separator className="my-6" />
      
      <SubjectNav />
      
      <section className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mes Fiches Pédagogiques</h2>
          <Button onClick={handleCreateLesson} className="bg-primary">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Fiche
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedLessons.map((lesson) => (
            <Card key={lesson.id} className="overflow-hidden border border-border/50">
              <CardHeader className="bg-muted/30 p-4">
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{lesson.subject}</span>
                  <span>Niveau: {lesson.level}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Créée le: {new Date(lesson.date).toLocaleDateString('fr-FR')}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleOpenLesson(lesson.id)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Ouvrir
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {/* Empty card for creating a new lesson */}
          <Card 
            className="overflow-hidden border border-dashed border-border/50 flex items-center justify-center cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
            onClick={handleCreateLesson}
          >
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Plus className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Créer une nouvelle fiche</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
