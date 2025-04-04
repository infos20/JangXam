
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Clock from '@/components/Clock';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGeminiApiKey } from '@/hooks/use-gemini-api-key';
import { generateFichePedagogique, FichePedagogiqueRequest, FichePedagogiqueSenegalaise } from '@/lib/gemini-api';
import GeminiApiKeyInput from '@/components/GeminiApiKeyInput';

// Interface pour les données du formulaire standard
interface LessonFormData {
  title: string;
  subject: string;
  level: string;
  duration: number;
  generalObjective: string;
  specificObjectives: string;
  materials: string;
  content: string;
  procedure: string;
}

// Interface pour les données du formulaire sénégalais
interface SenegaleseLessonFormData {
  title: string;
  subject: string;
  level: string;
  etape: string;
  numero: string;
  date: string;
  duration: number;
  activities: string;
  palier: string;
  competenceBase: string;
  objectifApprentissage: string;
  objectifsSpecifiques: string;
  contenu: string;
  moyensPedagogiques: string;
  moyensMateriels: string;
  documentation: string;
  objectifLecon: string;
  deroulementLecon: {
    miseEnSituation: {
      enseignant: string;
      eleves: string;
    };
    explorationAcquis: {
      enseignant: string;
      eleves: string;
    };
    constructionSavoir: {
      enseignant: string;
      eleves: string;
    };
    approfondissement: {
      enseignant: string;
      eleves: string;
    };
    production: {
      enseignant: string;
      eleves: string;
    };
    evaluation: {
      enseignant: string;
      eleves: string;
    };
  };
  exercices: {
    qcm: {
      question: string;
      options: string[];
      reponseCorrecte: string;
    };
    texteATrous: {
      texte: string;
      reponse: string;
    };
    exerciceApplication: {
      consigne: string;
      exempleReponse: string;
    };
  };
}

const CreateLesson = () => {
  const navigate = useNavigate();
  const [formTab, setFormTab] = useState<string>("standard");
  const { apiKey: geminiApiKey, saveApiKey: saveGeminiApiKey, clearApiKey: clearGeminiApiKey, isLoaded: isGeminiKeyLoaded } = useGeminiApiKey();
  
  // État pour le formulaire standard
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    subject: '',
    level: '',
    duration: 45,
    generalObjective: '',
    specificObjectives: '',
    materials: '',
    content: '',
    procedure: '',
  });

  // État pour le formulaire sénégalais
  const [senegaleseFormData, setSenegaleseFormData] = useState<SenegaleseLessonFormData>({
    title: '',
    subject: '',
    level: '',
    etape: '',
    numero: '',
    date: new Date().toISOString().split('T')[0],
    duration: 45,
    activities: '',
    palier: '',
    competenceBase: '',
    objectifApprentissage: '',
    objectifsSpecifiques: '',
    contenu: '',
    moyensPedagogiques: '',
    moyensMateriels: '',
    documentation: '',
    objectifLecon: '',
    deroulementLecon: {
      miseEnSituation: { enseignant: '', eleves: '' },
      explorationAcquis: { enseignant: '', eleves: '' },
      constructionSavoir: { enseignant: '', eleves: '' },
      approfondissement: { enseignant: '', eleves: '' },
      production: { enseignant: '', eleves: '' },
      evaluation: { enseignant: '', eleves: '' }
    },
    exercices: {
      qcm: {
        question: '',
        options: ['', '', '', ''],
        reponseCorrecte: ''
      },
      texteATrous: {
        texte: '',
        reponse: ''
      },
      exerciceApplication: {
        consigne: '',
        exempleReponse: ''
      }
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Gestionnaires pour le formulaire standard
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: keyof LessonFormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Gestionnaires pour le formulaire sénégalais - Champs principaux
  const handleSenegaleseInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setSenegaleseFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Gestionnaire pour les sélections du formulaire sénégalais
  const handleSenegaleseSelectChange = (field: keyof SenegaleseLessonFormData) => (value: string) => {
    setSenegaleseFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Gestionnaire pour les champs imbriqués du formulaire sénégalais
  const handleSenegaleseNestedChange = (section: string, subsection: string, field: string, value: string) => {
    setSenegaleseFormData(prev => {
      const newData = { ...prev };
      if (section === 'deroulementLecon') {
        newData.deroulementLecon = {
          ...newData.deroulementLecon,
          [subsection]: {
            ...newData.deroulementLecon[subsection as keyof typeof newData.deroulementLecon],
            [field]: value
          }
        };
      } else if (section === 'exercices') {
        if (subsection === 'qcm' && field.startsWith('option')) {
          const optionIndex = parseInt(field.replace('option', '')) - 1;
          const newOptions = [...newData.exercices.qcm.options];
          newOptions[optionIndex] = value;
          newData.exercices.qcm.options = newOptions;
        } else {
          newData.exercices = {
            ...newData.exercices,
            [subsection]: {
              ...newData.exercices[subsection as keyof typeof newData.exercices],
              [field]: value
            }
          };
        }
      }
      return newData;
    });
  };

  // Fonction pour générer une fiche pédagogique avec Gemini
  const handleGenerateFiche = async () => {
    if (!geminiApiKey) {
      toast.error("Veuillez d'abord configurer votre clé API Gemini");
      return;
    }

    const requiredFields = ['title', 'subject', 'level'];
    const missingFields = requiredFields.filter(field => !senegaleseFormData[field as keyof SenegaleseLessonFormData]);
    
    if (missingFields.length > 0) {
      toast.error(`Veuillez remplir les champs obligatoires: ${missingFields.join(', ')}`);
      return;
    }

    setIsGenerating(true);
    
    try {
      // Préparer les données pour l'API
      const requestData: FichePedagogiqueRequest = {
        titre: senegaleseFormData.title,
        niveau: senegaleseFormData.level,
        etape: senegaleseFormData.etape,
        activites: senegaleseFormData.activities,
        numero: senegaleseFormData.numero,
        duree: senegaleseFormData.duration.toString(),
        date: senegaleseFormData.date,
        palier: senegaleseFormData.palier
      };
      
      // Appel à l'API Gemini
      const generatedFiche = await generateFichePedagogique(geminiApiKey, requestData);
      
      if (!generatedFiche) {
        toast.error("Erreur lors de la génération de la fiche");
        setIsGenerating(false);
        return;
      }
      
      // Mise à jour du formulaire avec les données générées
      setSenegaleseFormData({
        ...senegaleseFormData,
        competenceBase: generatedFiche.competenceBase,
        objectifApprentissage: generatedFiche.objectifApprentissage,
        objectifsSpecifiques: generatedFiche.objectifsSpecifiques,
        contenu: generatedFiche.contenu,
        moyensPedagogiques: generatedFiche.moyensPedagogiques,
        moyensMateriels: generatedFiche.moyensMateriels,
        documentation: generatedFiche.documentation,
        objectifLecon: generatedFiche.objectifLecon,
        deroulementLecon: generatedFiche.deroulementLecon,
        exercices: generatedFiche.exercices
      });
      
      toast.success("Fiche pédagogique générée avec succès");
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      toast.error("Une erreur est survenue lors de la génération");
    } finally {
      setIsGenerating(false);
    }
  };

  // Soumission du formulaire
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Vérification des champs requis selon le type de formulaire
    if (formTab === "standard") {
      if (!formData.title || !formData.subject || !formData.level) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        setIsSubmitting(false);
        return;
      }
    } else {
      if (!senegaleseFormData.title || !senegaleseFormData.subject || !senegaleseFormData.level) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        setIsSubmitting(false);
        return;
      }
    }

    // Simulation d'un appel API avec timeout
    setTimeout(() => {
      toast.success('Fiche pédagogique créée avec succès!');
      setIsSubmitting(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Créer une Fiche Pédagogique</h1>
            <p className="text-muted-foreground">Remplissez les informations de votre fiche</p>
          </div>
        </div>
        <Clock />
      </header>

      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="standard" value={formTab} onValueChange={setFormTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="standard">Modèle Standard</TabsTrigger>
            <TabsTrigger value="senegalais">Modèle Sénégalais</TabsTrigger>
          </TabsList>
          
          {/* Formulaire Standard */}
          <TabsContent value="standard">
            <div className="bg-card p-6 rounded-lg border border-border">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Informations de base */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Informations de base</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="title" className="block mb-2 text-sm font-medium">
                        Titre de la leçon <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="title" 
                        placeholder="Ex: Introduction à la lecture" 
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                        Matière <span className="text-red-500">*</span>
                      </label>
                      <Select 
                        value={formData.subject} 
                        onValueChange={handleSelectChange('subject')}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une matière" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Français">Français</SelectItem>
                          <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                          <SelectItem value="Sciences">Sciences</SelectItem>
                          <SelectItem value="Histoire-Géo">Histoire-Géographie</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Musique">Musique</SelectItem>
                          <SelectItem value="Éducation Civique">Éducation Civique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="level" className="block mb-2 text-sm font-medium">
                        Niveau <span className="text-red-500">*</span>
                      </label>
                      <Select 
                        value={formData.level} 
                        onValueChange={handleSelectChange('level')}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un niveau" />
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
                    
                    <div>
                      <label htmlFor="duration" className="block mb-2 text-sm font-medium">Durée (minutes)</label>
                      <Input 
                        id="duration" 
                        type="number" 
                        value={formData.duration} 
                        onChange={handleInputChange} 
                        min={5}
                        max={180}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Objectifs */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Objectifs</h2>
                  
                  <div>
                    <label htmlFor="generalObjective" className="block mb-2 text-sm font-medium">Objectif général</label>
                    <Textarea 
                      id="generalObjective" 
                      placeholder="Ex: Développer la capacité des élèves à lire des textes simples" 
                      rows={2}
                      value={formData.generalObjective}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="specificObjectives" className="block mb-2 text-sm font-medium">Objectifs spécifiques</label>
                    <Textarea 
                      id="specificObjectives" 
                      placeholder="Ex: 
- Reconnaître les lettres de l'alphabet
- Associer les sons aux lettres
- Former des syllabes simples" 
                      rows={4}
                      value={formData.specificObjectives}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Contenu</h2>
                  
                  <div>
                    <label htmlFor="materials" className="block mb-2 text-sm font-medium">Matériels pédagogiques</label>
                    <Textarea 
                      id="materials" 
                      placeholder="Ex: Tableau, craie, cahiers, livres de lecture, images" 
                      rows={2}
                      value={formData.materials}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block mb-2 text-sm font-medium">Contenu de la leçon</label>
                    <Textarea 
                      id="content" 
                      placeholder="Détaillez le contenu de votre leçon ici..." 
                      rows={6}
                      value={formData.content}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="procedure" className="block mb-2 text-sm font-medium">Déroulement pédagogique</label>
                    <Textarea 
                      id="procedure" 
                      placeholder="Décrivez le déroulement de votre leçon étape par étape..." 
                      rows={8}
                      value={formData.procedure}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          {/* Formulaire Sénégalais */}
          <TabsContent value="senegalais">
            <div className="mb-6">
              <GeminiApiKeyInput 
                apiKey={geminiApiKey}
                onSave={saveGeminiApiKey}
                onClear={clearGeminiApiKey}
              />
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Informations de base */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Informations de base</h2>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={handleGenerateFiche}
                      disabled={isGenerating || !geminiApiKey}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></div>
                          Génération...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4" />
                          Générer avec Gemini
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="title" className="block mb-2 text-sm font-medium">
                        Titre de la leçon <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="title" 
                        placeholder="Ex: Les nombres de 1 à 10" 
                        value={senegaleseFormData.title}
                        onChange={handleSenegaleseInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                        Matière <span className="text-red-500">*</span>
                      </label>
                      <Select 
                        value={senegaleseFormData.subject} 
                        onValueChange={handleSenegaleseSelectChange('subject')}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une matière" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Français">Français</SelectItem>
                          <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                          <SelectItem value="Sciences">Sciences</SelectItem>
                          <SelectItem value="Histoire-Géo">Histoire-Géographie</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Musique">Musique</SelectItem>
                          <SelectItem value="Éducation Civique">Éducation Civique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="level" className="block mb-2 text-sm font-medium">
                        Niveau <span className="text-red-500">*</span>
                      </label>
                      <Select 
                        value={senegaleseFormData.level} 
                        onValueChange={handleSenegaleseSelectChange('level')}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un niveau" />
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
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="etape" className="block mb-2 text-sm font-medium">Étape</label>
                      <Input 
                        id="etape" 
                        placeholder="Ex: Première étape" 
                        value={senegaleseFormData.etape}
                        onChange={handleSenegaleseInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="activities" className="block mb-2 text-sm font-medium">Activités</label>
                      <Input 
                        id="activities" 
                        placeholder="Ex: Lecture" 
                        value={senegaleseFormData.activities}
                        onChange={handleSenegaleseInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="numero" className="block mb-2 text-sm font-medium">Numéro de séance</label>
                      <Input 
                        id="numero" 
                        placeholder="Ex: 1" 
                        value={senegaleseFormData.numero}
                        onChange={handleSenegaleseInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="duration" className="block mb-2 text-sm font-medium">Durée (minutes)</label>
                      <Input 
                        id="duration" 
                        type="number" 
                        value={senegaleseFormData.duration} 
                        onChange={handleSenegaleseInputChange} 
                        min={5}
                        max={180}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="date" className="block mb-2 text-sm font-medium">Date</label>
                      <Input 
                        id="date" 
                        type="date" 
                        value={senegaleseFormData.date} 
                        onChange={handleSenegaleseInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="palier" className="block mb-2 text-sm font-medium">Palier</label>
                      <Input 
                        id="palier" 
                        placeholder="Ex: 1" 
                        value={senegaleseFormData.palier}
                        onChange={handleSenegaleseInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Compétences et Objectifs */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Compétences et Objectifs</h2>
                  
                  <div>
                    <label htmlFor="competenceBase" className="block mb-2 text-sm font-medium">Compétence de base</label>
                    <Textarea 
                      id="competenceBase" 
                      placeholder="Identifier la compétence à développer selon les référentiels sénégalais" 
                      rows={2}
                      value={senegaleseFormData.competenceBase}
                      onChange={handleSenegaleseInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="objectifApprentissage" className="block mb-2 text-sm font-medium">Objectif d'apprentissage (OA)</label>
                    <Textarea 
                      id="objectifApprentissage" 
                      placeholder="Définir l'objectif global de la leçon" 
                      rows={2}
                      value={senegaleseFormData.objectifApprentissage}
                      onChange={handleSenegaleseInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="objectifsSpecifiques" className="block mb-2 text-sm font-medium">Objectifs spécifiques (OS)</label>
                    <Textarea 
                      id="objectifsSpecifiques" 
                      placeholder="Détail des compétences précises à acquérir" 
                      rows={3}
                      value={senegaleseFormData.objectifsSpecifiques}
                      onChange={handleSenegaleseInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="objectifLecon" className="block mb-2 text-sm font-medium">Objectif de la leçon</label>
                    <Textarea 
                      id="objectifLecon" 
                      placeholder="Expliquer ce que les élèves doivent être capables de faire après la leçon" 
                      rows={2}
                      value={senegaleseFormData.objectifLecon}
                      onChange={handleSenegaleseInputChange}
                    />
                  </div>
                </div>
                
                {/* Contenu et Moyens */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Contenu et Moyens</h2>
                  
                  <div>
                    <label htmlFor="contenu" className="block mb-2 text-sm font-medium">Contenu</label>
                    <Textarea 
                      id="contenu" 
                      placeholder="Présenter les notions abordées" 
                      rows={4}
                      value={senegaleseFormData.contenu}
                      onChange={handleSenegaleseInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="moyensPedagogiques" className="block mb-2 text-sm font-medium">Moyens pédagogiques</label>
                    <Textarea 
                      id="moyensPedagogiques" 
                      placeholder="Indiquer les méthodes utilisées (discussion, observation, jeux éducatifs, etc.)" 
                      rows={3}
                      value={senegaleseFormData.moyensPedagogiques}
                      onChange={handleSenegaleseInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="moyensMateriels" className="block mb-2 text-sm font-medium">Moyens matériels</label>
                    <Textarea 
                      id="moyensMateriels" 
                      placeholder="Mentionner les ressources nécessaires (ardoises, images, contes africains, objets du quotidien, etc.)" 
                      rows={3}
                      value={senegaleseFormData.moyensMateriels}
                      onChange={handleSenegaleseInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="documentation" className="block mb-2 text-sm font-medium">Documentation</label>
                    <Textarea 
                      id="documentation" 
                      placeholder="Lister les documents de référence utilisés (manuel scolaire, guide pédagogique, etc.)" 
                      rows={2}
                      value={senegaleseFormData.documentation}
                      onChange={handleSenegaleseInputChange}
                    />
                  </div>
                </div>
                
                {/* Déroulement de la leçon */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Déroulement de la leçon</h2>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Étapes</TableHead>
                        <TableHead className="w-1/2">Activités de l'enseignant</TableHead>
                        <TableHead className="w-1/4">Activités des élèves</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">1. Mise en situation / Motivation</TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.miseEnSituation.enseignant}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'miseEnSituation', 'enseignant', e.target.value)}
                            placeholder="Présenter une situation concrète du quotidien sénégalais. Poser des questions."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.miseEnSituation.eleves}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'miseEnSituation', 'eleves', e.target.value)}
                            placeholder="Écouter, répondre et interagir."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2. Exploration des acquis / Prérequis</TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.explorationAcquis.enseignant}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'explorationAcquis', 'enseignant', e.target.value)}
                            placeholder="Amener les élèves à donner des exemples liés à leur environnement."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.explorationAcquis.eleves}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'explorationAcquis', 'eleves', e.target.value)}
                            placeholder="Partager leurs connaissances et expériences."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">3. Construction du savoir / Apprentissage actif</TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.constructionSavoir.enseignant}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'constructionSavoir', 'enseignant', e.target.value)}
                            placeholder="Expliquer le concept avec des supports concrets et interactifs."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.constructionSavoir.eleves}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'constructionSavoir', 'eleves', e.target.value)}
                            placeholder="Répéter, reformuler et manipuler les notions abordées."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">4. Approfondissement / Pratique guidée</TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.approfondissement.enseignant}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'approfondissement', 'enseignant', e.target.value)}
                            placeholder="Proposer des exercices pratiques (mise en situation, dessin, manipulation)."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.approfondissement.eleves}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'approfondissement', 'eleves', e.target.value)}
                            placeholder="Réaliser les exercices en binômes ou petits groupes."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">5. Production / Transfert des acquis</TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.production.enseignant}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'production', 'enseignant', e.target.value)}
                            placeholder="Demander aux élèves d'appliquer la notion apprise dans une nouvelle situation."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.production.eleves}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'production', 'eleves', e.target.value)}
                            placeholder="Produire une réponse individuelle ou collaborative."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">6. Évaluation et remédiation</TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.evaluation.enseignant}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'evaluation', 'enseignant', e.target.value)}
                            placeholder="Corriger collectivement, apporter des explications supplémentaires."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Textarea
                            value={senegaleseFormData.deroulementLecon.evaluation.eleves}
                            onChange={(e) => handleSenegaleseNestedChange('deroulementLecon', 'evaluation', 'eleves', e.target.value)}
                            placeholder="Ajuster leurs réponses et retenir les points clés."
                            rows={2}
                            className="min-h-[60px]"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                {/* Exercices */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Exercices et Corrigés Automatiques</h2>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">1️⃣ QCM (Question à Choix Multiples)</CardTitle>
                      <CardDescription>Proposer une question en lien avec la leçon avec quatre options de réponse.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Question</label>
                        <Textarea
                          value={senegaleseFormData.exercices.qcm.question}
                          onChange={(e) => handleSenegaleseNestedChange('exercices', 'qcm', 'question', e.target.value)}
                          placeholder="Entrez votre question ici"
                          rows={2}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((num) => (
                          <div key={`option${num}`}>
                            <label className="block mb-2 text-sm font-medium">Option {num}</label>
                            <Input
                              value={senegaleseFormData.exercices.qcm.options[num - 1]}
                              onChange={(e) => handleSenegaleseNestedChange('exercices', 'qcm', `option${num}`, e.target.value)}
                              placeholder={`Option ${num}`}
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium">Réponse correcte</label>
                        <Select 
                          value={senegaleseFormData.exercices.qcm.reponseCorrecte} 
                          onValueChange={(value) => handleSenegaleseNestedChange('exercices', 'qcm', 'reponseCorrecte', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la bonne réponse" />
                          </SelectTrigger>
                          <SelectContent>
                            {senegaleseFormData.exercices.qcm.options.map((option, index) => (
                              <SelectItem key={index} value={option || `Option ${index + 1}`}>
                                {option || `Option ${index + 1}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">2️⃣ Texte à trous</CardTitle>
                      <CardDescription>Présenter une phrase où un mot-clé manque.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Texte avec trou (utilisez ___ pour le trou)</label>
                        <Textarea
                          value={senegaleseFormData.exercices.texteATrous.texte}
                          onChange={(e) => handleSenegaleseNestedChange('exercices', 'texteATrous', 'texte', e.target.value)}
                          placeholder="Ex: Les nombres de 1 à ___ sont appelés nombres entiers naturels."
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium">Réponse attendue</label>
                        <Input
                          value={senegaleseFormData.exercices.texteATrous.reponse}
                          onChange={(e) => handleSenegaleseNestedChange('exercices', 'texteATrous', 'reponse', e.target.value)}
                          placeholder="Ex: 10"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">3️⃣ Exercice d'application</CardTitle>
                      <CardDescription>Demander aux élèves d'écrire une phrase, d'expliquer un concept ou de réaliser un dessin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium">Consigne</label>
                        <Textarea
                          value={senegaleseFormData.exercices.exerciceApplication.consigne}
                          onChange={(e) => handleSenegaleseNestedChange('exercices', 'exerciceApplication', 'consigne', e.target.value)}
                          placeholder="Ex: Écrivez une phrase avec les mots 'marché' et 'légumes'."
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium">Exemple de réponse correcte</label>
                        <Textarea
                          value={senegaleseFormData.exercices.exerciceApplication.exempleReponse}
                          onChange={(e) => handleSenegaleseNestedChange('exercices', 'exerciceApplication', 'exempleReponse', e.target.value)}
                          placeholder="Ex: Je vais au marché avec ma mère pour acheter des légumes frais."
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-4 flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateLesson;
