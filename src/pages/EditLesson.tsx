
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import Clock from '@/components/Clock';

interface Lesson {
  id: number;
  title: string;
  subject: string;
  level: string;
  date: string;
  objectives?: string;
  specificObjectives?: string;
  materials?: string;
  content?: string;
  procedure?: string;
  duration?: number;
}

const EditLesson = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson>({
    id: 0,
    title: '',
    subject: '',
    level: '',
    date: new Date().toISOString().split('T')[0],
    objectives: '',
    specificObjectives: '',
    materials: '',
    content: '',
    procedure: '',
    duration: 45
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulating data fetch with a timeout
    setLoading(true);
    setTimeout(() => {
      const lessonData: Record<string, Lesson> = {
        '1': {
          id: 1,
          title: 'Introduction à la Lecture',
          subject: 'Français',
          level: 'CP',
          date: '2025-04-01',
          objectives: 'Développer la capacité des élèves à lire des textes simples',
          specificObjectives: '- Reconnaître les lettres de l\'alphabet\n- Associer les sons aux lettres\n- Former des syllabes simples',
          materials: 'Tableau, craie, cahiers, livres de lecture, images',
          content: 'Cette leçon se concentre sur les bases de la lecture pour les élèves de CP. Nous allons parcourir les lettres de l\'alphabet, les sons associés et la formation de syllabes simples pour construire des mots.',
          procedure: '1. Introduction (5 min): Accueil des élèves et présentation du sujet\n2. Révision de l\'alphabet (10 min): Revue collective des lettres\n3. Association sons-lettres (15 min): Exercices pratiques\n4. Formation de syllabes (10 min): Combinaisons de consonnes et voyelles\n5. Conclusion (5 min): Récapitulatif des apprentissages',
          duration: 45
        },
        '2': {
          id: 2,
          title: 'Les Nombres de 1 à 10',
          subject: 'Mathématiques',
          level: 'CI',
          date: '2025-04-02',
          objectives: 'Familiariser les élèves avec les nombres de 1 à 10',
          specificObjectives: '- Reconnaître les chiffres de 1 à 10\n- Compter de 1 à 10 et vice versa\n- Associer quantité et représentation numérique',
          materials: 'Tableau, feuilles de travail, objets à compter (jetons, bâtonnets)',
          content: 'Cette leçon initie les élèves à la reconnaissance des nombres de 1 à 10, au comptage et à l\'association entre quantité d\'objets et représentation numérique.',
          procedure: '1. Comptage collectif (10 min)\n2. Reconnaissance des chiffres (10 min)\n3. Association quantité-chiffre (15 min)\n4. Jeu de mémorisation (10 min)',
          duration: 45
        },
      };

      if (id && lessonData[id]) {
        setLesson(lessonData[id]);
      } else {
        toast.error('Fiche pédagogique introuvable');
        navigate('/');
      }
      setLoading(false);
    }, 800);
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLesson(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setLesson(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: string, value: string) => {
    setLesson(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to update the lesson
    toast.success('Fiche pédagogique mise à jour avec succès');
    navigate(`/lesson/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Modifier: {lesson.title}</h1>
        </div>
        <Clock />
      </header>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={lesson.title} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Matière</Label>
                  <Select 
                    value={lesson.subject} 
                    onValueChange={(value) => handleSelectChange('subject', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Français">Français</SelectItem>
                      <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                      <SelectItem value="Sciences">Sciences</SelectItem>
                      <SelectItem value="Histoire">Histoire</SelectItem>
                      <SelectItem value="Géographie">Géographie</SelectItem>
                      <SelectItem value="Musique">Musique</SelectItem>
                      <SelectItem value="Arts Plastiques">Arts Plastiques</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Niveau</Label>
                  <Select 
                    value={lesson.level} 
                    onValueChange={(value) => handleSelectChange('level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CI">CI</SelectItem>
                      <SelectItem value="CP">CP</SelectItem>
                      <SelectItem value="CE1">CE1</SelectItem>
                      <SelectItem value="CE2">CE2</SelectItem>
                      <SelectItem value="CM1">CM1</SelectItem>
                      <SelectItem value="CM2">CM2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Durée (min)</Label>
                  <Input 
                    id="duration" 
                    name="duration" 
                    type="number" 
                    value={lesson.duration} 
                    onChange={(e) => handleNumberChange('duration', e.target.value)}
                    min="5"
                    max="120"
                    step="5"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="objectives">Objectif général</Label>
                <Textarea 
                  id="objectives" 
                  name="objectives" 
                  value={lesson.objectives} 
                  onChange={handleChange} 
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specificObjectives">Objectifs spécifiques</Label>
                <Textarea 
                  id="specificObjectives" 
                  name="specificObjectives" 
                  value={lesson.specificObjectives} 
                  onChange={handleChange} 
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate(-1)}>
                Annuler
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Contenu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Description</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  value={lesson.content} 
                  onChange={handleChange} 
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="materials">Matériel nécessaire</Label>
                <Textarea 
                  id="materials" 
                  name="materials" 
                  value={lesson.materials} 
                  onChange={handleChange} 
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="procedure">Déroulement pédagogique</Label>
                <Textarea 
                  id="procedure" 
                  name="procedure" 
                  value={lesson.procedure} 
                  onChange={handleChange} 
                  rows={8}
                  placeholder="1. Introduction (5 min)\n2. ..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default EditLesson;
