
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Printer, Edit, Star, Clock as ClockIcon } from 'lucide-react';
import { toast } from 'sonner';
import Clock from '@/components/Clock';
import NavigationMenu from '@/components/NavigationMenu';

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

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
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
        '3': {
          id: 3,
          title: 'Le Corps Humain',
          subject: 'Sciences',
          level: 'CE1',
          date: '2025-04-03',
          objectives: 'Découvrir les principales parties du corps humain',
          specificObjectives: '- Identifier les parties principales du corps\n- Comprendre les fonctions basiques\n- Apprendre le vocabulaire associé',
          materials: 'Poster du corps humain, fiches d\'activités, crayons de couleur',
          content: 'Les élèves découvriront les principales parties du corps humain et leurs fonctions basiques à travers des activités interactives.',
          procedure: '1. Introduction (5 min)\n2. Présentation du corps humain (15 min)\n3. Activité de dessin (15 min)\n4. Quiz interactif (10 min)',
          duration: 45
        },
        '4': {
          id: 4,
          title: 'Les Saisons',
          subject: 'Sciences',
          level: 'CP',
          date: '2025-04-01',
          objectives: 'Comprendre le cycle des saisons',
          specificObjectives: '- Identifier les quatre saisons\n- Reconnaître les caractéristiques de chaque saison\n- Associer activités et vêtements aux saisons',
          materials: 'Images des saisons, calendrier annuel, fiches d\'activités',
          content: 'Cette leçon explore le cycle des saisons et leurs caractéristiques principales.',
          procedure: '1. Discussion sur le temps aujourd\'hui (5 min)\n2. Présentation des saisons (15 min)\n3. Activité de tri d\'images (15 min)\n4. Création d\'un calendrier des saisons (10 min)',
          duration: 45
        },
        '5': {
          id: 5,
          title: 'La Conjugaison',
          subject: 'Français',
          level: 'CE2',
          date: '2025-03-28',
          objectives: 'Introduire les bases de la conjugaison aux temps simples',
          specificObjectives: '- Comprendre la notion de verbe\n- Identifier les pronoms personnels\n- Conjuguer des verbes simples au présent',
          materials: 'Tableau, cahiers, fiches de conjugaison',
          content: 'Cette leçon présente les fondamentaux de la conjugaison française avec focus sur le présent de l\'indicatif.',
          procedure: '1. Rappel sur les verbes (10 min)\n2. Introduction des pronoms personnels (10 min)\n3. Exercices de conjugaison (20 min)\n4. Récapitulatif (5 min)',
          duration: 45
        },
        '6': {
          id: 6,
          title: 'Les Notes de Musique',
          subject: 'Musique',
          level: 'CM1',
          date: '2025-03-25',
          objectives: 'Initier les élèves aux notes de musique',
          specificObjectives: '- Reconnaître les notes sur une portée\n- Comprendre la durée des notes\n- Lire une mélodie simple',
          materials: 'Tableau avec portées, instruments de musique simples, fiches d\'exercices',
          content: 'Les élèves découvriront les bases de la notation musicale et apprendront à lire des mélodies simples.',
          procedure: '1. Introduction à la portée musicale (10 min)\n2. Présentation des notes (15 min)\n3. Exercices de lecture (15 min)\n4. Application pratique avec instruments (10 min)',
          duration: 50
        }
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

  const handlePrint = () => {
    toast.info('Préparation de l\'impression...');
    window.print();
  };

  const handleEdit = () => {
    navigate(`/edit-lesson/${id}`);
  };

  const handleFavorite = () => {
    toast.success('Fiche ajoutée aux favoris');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Fiche introuvable</h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationMenu />
      
      <div className="p-4 md:p-8">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{lesson.subject}</span>
                <span>•</span>
                <span>Niveau: {lesson.level}</span>
                <span>•</span>
                <span className="flex items-center">
                  <ClockIcon className="mr-1 h-4 w-4" />
                  {lesson.duration} min
                </span>
              </div>
            </div>
          </div>
          <Clock />
        </header>

        <div className="flex gap-2 mb-6">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button variant="outline" onClick={handleFavorite}>
            <Star className="mr-2 h-4 w-4" />
            Favoris
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Objectifs</h2>
                <div className="mb-4">
                  <h3 className="text-base font-medium text-muted-foreground mb-2">Objectif général</h3>
                  <p>{lesson.objectives}</p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-muted-foreground mb-2">Objectifs spécifiques</h3>
                  <pre className="whitespace-pre-wrap font-sans">{lesson.specificObjectives}</pre>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contenu</h2>
                <p className="mb-4">{lesson.content}</p>
                <Separator className="my-4" />
                <h3 className="text-base font-medium text-muted-foreground mb-2">Déroulement pédagogique</h3>
                <pre className="whitespace-pre-wrap font-sans">{lesson.procedure}</pre>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Informations</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date de création</h3>
                    <p>{new Date(lesson.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Matière</h3>
                    <p>{lesson.subject}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Niveau</h3>
                    <p>{lesson.level}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Durée</h3>
                    <p>{lesson.duration} minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Matériel nécessaire</h2>
                <p>{lesson.materials}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
