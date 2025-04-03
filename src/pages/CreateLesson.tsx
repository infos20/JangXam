
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Clock from '@/components/Clock';
import { toast } from 'sonner';

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

const CreateLesson = () => {
  const navigate = useNavigate();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Check required fields
    if (!formData.title || !formData.subject || !formData.level) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call with timeout
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

      <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg border border-border">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Info */}
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
          
          {/* Objectives */}
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
          
          {/* Content */}
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
    </div>
  );
};

export default CreateLesson;
