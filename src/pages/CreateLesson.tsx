
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Clock from '@/components/Clock';

const CreateLesson = () => {
  const navigate = useNavigate();

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
        <form className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Informations de base</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium">Titre de la leçon</label>
                <Input id="title" placeholder="Ex: Introduction à la lecture" />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">Matière</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="francais">Français</SelectItem>
                    <SelectItem value="maths">Mathématiques</SelectItem>
                    <SelectItem value="sciences">Sciences</SelectItem>
                    <SelectItem value="histgeo">Histoire-Géographie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="level" className="block mb-2 text-sm font-medium">Niveau</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ci">CI</SelectItem>
                    <SelectItem value="cp">CP</SelectItem>
                    <SelectItem value="ce1">CE1</SelectItem>
                    <SelectItem value="ce2">CE2</SelectItem>
                    <SelectItem value="cm1">CM1</SelectItem>
                    <SelectItem value="cm2">CM2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="duration" className="block mb-2 text-sm font-medium">Durée (minutes)</label>
                <Input id="duration" type="number" defaultValue={45} />
              </div>
            </div>
          </div>
          
          {/* Objectives */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Objectifs</h2>
            
            <div>
              <label htmlFor="general-objective" className="block mb-2 text-sm font-medium">Objectif général</label>
              <Textarea 
                id="general-objective" 
                placeholder="Ex: Développer la capacité des élèves à lire des textes simples" 
                rows={2}
              />
            </div>
            
            <div>
              <label htmlFor="specific-objectives" className="block mb-2 text-sm font-medium">Objectifs spécifiques</label>
              <Textarea 
                id="specific-objectives" 
                placeholder="Ex: 
- Reconnaître les lettres de l'alphabet
- Associer les sons aux lettres
- Former des syllabes simples" 
                rows={4}
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
              />
            </div>
            
            <div>
              <label htmlFor="lesson-content" className="block mb-2 text-sm font-medium">Contenu de la leçon</label>
              <Textarea 
                id="lesson-content" 
                placeholder="Détaillez le contenu de votre leçon ici..." 
                rows={6}
              />
            </div>
            
            <div>
              <label htmlFor="procedure" className="block mb-2 text-sm font-medium">Déroulement pédagogique</label>
              <Textarea 
                id="procedure" 
                placeholder="Décrivez le déroulement de votre leçon étape par étape..." 
                rows={8}
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Annuler
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLesson;
