
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Printer, Edit, Star, Clock as ClockIcon } from 'lucide-react';
import { toast } from 'sonner';
import Clock from '@/components/Clock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SenegaleseLessonDetail from '@/components/SenegaleseLessonDetail';

// Interface pour une leçon standard
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
  // Champs pour le modèle sénégalais (optionnels)
  modelType?: 'standard' | 'senegalais';
  competenceBase?: string;
  palier?: string;
  objectifApprentissage?: string;
  objectifLecon?: string;
  moyensPedagogiques?: string;
  moyensMateriels?: string;
  documentation?: string;
  deroulementLecon?: any;
  exercices?: any;
}

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewTab, setViewTab] = useState<string>("standard");

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
          duration: 45,
          modelType: 'standard'
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
          duration: 45,
          modelType: 'standard'
        },
        '3': {
          id: 3,
          title: 'Le Corps Humain',
          subject: 'Sciences',
          level: 'CE1',
          date: '2025-04-03',
          title: 'Le Corps Humain',
          modelType: 'senegalais',
          level: 'CE1',
          subject: 'Sciences',
          date: '2025-04-03',
          etape: 'Première étape',
          numero: '3',
          duration: 45,
          activities: 'Sciences',
          palier: '2',
          competenceBase: 'Intégrer les notions d\'anatomie humaine de base',
          objectifApprentissage: 'Découvrir les principales parties du corps humain et leurs fonctions',
          objectifsSpecifiques: '- Identifier les parties principales du corps\n- Comprendre les fonctions basiques\n- Apprendre le vocabulaire associé',
          contenu: 'Les élèves découvriront les principales parties du corps humain et leurs fonctions basiques à travers des activités interactives.',
          moyensPedagogiques: 'Observation, discussion, manipulation, dessins',
          moyensMateriels: 'Poster du corps humain, fiches d\'activités, crayons de couleur',
          documentation: 'Manuel scolaire de sciences CE1, Guides pédagogiques officiels sénégalais',
          objectifLecon: 'À la fin de la leçon, les élèves doivent être capables de nommer les principales parties du corps et d\'expliquer leurs fonctions basiques.',
          deroulementLecon: {
            miseEnSituation: {
              enseignant: 'Présenter une image d\'un enfant sénégalais jouant au football. Demander: "Quelles parties du corps utilise-t-il pour jouer?"',
              eleves: 'Observer l\'image, identifier et nommer les parties du corps utilisées (jambes, pieds, bras, etc.).'
            },
            explorationAcquis: {
              enseignant: 'Interroger les élèves sur les noms des parties du corps qu\'ils connaissent déjà.',
              eleves: 'Partager leurs connaissances en nommant les parties du corps et en les montrant sur eux-mêmes.'
            },
            constructionSavoir: {
              enseignant: 'Utiliser le poster pour présenter systématiquement les principales parties du corps et expliquer leur fonction basique.',
              eleves: 'Écouter, répéter les noms des parties, poser des questions et compléter une fiche d\'identification.'
            },
            approfondissement: {
              enseignant: 'Organiser un jeu où les élèves doivent toucher la partie du corps nommée. Distribuer des fiches pour dessiner un corps humain.',
              eleves: 'Participer au jeu et dessiner un corps humain en identifiant correctement les différentes parties.'
            },
            production: {
              enseignant: 'Demander aux élèves de compléter par binôme une silhouette avec les noms des parties du corps.',
              eleves: 'Collaborer pour compléter la silhouette et présenter leur travail à la classe.'
            },
            evaluation: {
              enseignant: 'Proposer un exercice où les élèves relient les images des parties du corps à leurs noms et fonctions.',
              eleves: 'Réaliser l\'exercice individuellement et participer à la correction collective.'
            }
          },
          exercices: {
            qcm: {
              question: 'Quelle partie du corps nous permet de respirer?',
              options: ['Les poumons', 'Le cœur', 'L\'estomac', 'Le cerveau'],
              reponseCorrecte: 'Les poumons'
            },
            texteATrous: {
              texte: 'Le ___ est l\'organe qui fait circuler le sang dans tout notre corps.',
              reponse: 'cœur'
            },
            exerciceApplication: {
              consigne: 'Dessinez un corps humain et identifiez au moins 5 parties principales avec leurs noms.',
              exempleReponse: 'Un dessin montrant la tête, les bras, les jambes, le tronc et les pieds, avec les noms correctement indiqués.'
            }
          }
        }
      };

      if (id && lessonData[id]) {
        setLesson(lessonData[id]);
        // Déterminer l'onglet à afficher par défaut en fonction du type de modèle
        setViewTab(lessonData[id].modelType || 'standard');
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

  // Déterminer si la leçon est du modèle sénégalais
  const isSenegaleseModel = lesson.modelType === 'senegalais' || !!lesson.competenceBase;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
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

      {isSenegaleseModel ? (
        <SenegaleseLessonDetail lesson={lesson} />
      ) : (
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
      )}
    </div>
  );
};

export default LessonDetail;
