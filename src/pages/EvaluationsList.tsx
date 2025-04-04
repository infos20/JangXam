
import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/NavigationMenu';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { ClipboardList, Plus, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EvaluationCard from '@/components/EvaluationCard';
import { Evaluation } from '@/types/evaluation';

const EvaluationsList = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState<Evaluation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - in a real app, this would come from your API
    const mockEvaluations: Evaluation[] = [
      {
        id: 1,
        title: 'Évaluation de Français - Conjugaison',
        type: 'formative',
        subject: 'Français',
        level: 'CE2',
        maxScore: 20,
        date: '2025-04-15',
        term: 'Trimestre 3',
        description: 'Conjugaison des verbes du premier groupe au présent',
        questions: [
          {
            id: 1,
            type: 'fill_blank',
            text: 'Je ____ (manger) une pomme.',
            points: 2,
            correctAnswer: 'mange'
          },
          {
            id: 2,
            type: 'multiple_choice',
            text: 'Quelle est la terminaison des verbes du 1er groupe à la 3ème personne du pluriel au présent ?',
            options: ['-ent', '-ont', '-e', '-es'],
            correctAnswer: '-ent',
            points: 2
          }
        ],
        status: 'published'
      },
      {
        id: 2,
        title: 'Contrôle de Mathématiques - Fractions',
        type: 'summative',
        subject: 'Mathématiques',
        level: 'CM1',
        maxScore: 20,
        date: '2025-04-20',
        term: 'Trimestre 3',
        description: 'Évaluation sur les fractions et les opérations',
        questions: [
          {
            id: 1,
            type: 'essay',
            text: 'Résoudre l\'exercice suivant: 3/4 + 1/2 = ?',
            points: 5
          },
          {
            id: 2,
            type: 'short_answer',
            text: 'Écrivez 0,5 sous forme de fraction irréductible.',
            correctAnswer: '1/2',
            points: 3
          }
        ],
        status: 'draft'
      },
      {
        id: 3,
        title: 'Quiz sur les Animaux Domestiques',
        type: 'formative',
        subject: 'Sciences',
        level: 'CP',
        maxScore: 10,
        date: '2025-04-05',
        term: 'Trimestre 3',
        questions: [
          {
            id: 1,
            type: 'multiple_choice',
            text: 'Quel animal donne du lait ?',
            options: ['La vache', 'Le coq', 'Le mouton', 'Le cheval'],
            correctAnswer: 'La vache',
            points: 1
          }
        ],
        status: 'published'
      },
      {
        id: 4,
        title: 'Évaluation sur l\'Histoire du Sénégal',
        type: 'summative',
        subject: 'Histoire',
        level: 'CM2',
        maxScore: 20,
        date: '2025-03-28',
        term: 'Trimestre 3',
        description: 'Les grandes figures historiques du Sénégal',
        questions: [
          {
            id: 1,
            type: 'essay',
            text: 'Décrivez le rôle de Lat Dior dans la résistance contre la colonisation française.',
            points: 10
          }
        ],
        status: 'published'
      },
      {
        id: 5,
        title: 'Test de Lecture',
        type: 'formative',
        subject: 'Français',
        level: 'CE1',
        maxScore: 10,
        date: '2025-04-10',
        term: 'Trimestre 3',
        description: 'Compréhension d\'un texte court',
        questions: [
          {
            id: 1,
            type: 'short_answer',
            text: 'Après avoir lu le texte, répondez aux questions suivantes...',
            points: 5
          }
        ],
        status: 'draft'
      }
    ];

    setEvaluations(mockEvaluations);
    setFilteredEvaluations(mockEvaluations);
  }, []);

  useEffect(() => {
    let results = evaluations;
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(evaluation => 
        evaluation.title.toLowerCase().includes(query) || 
        evaluation.description?.toLowerCase().includes(query) ||
        evaluation.subject.toLowerCase().includes(query)
      );
    }
    
    // Filter by level
    if (levelFilter) {
      results = results.filter(evaluation => evaluation.level === levelFilter);
    }
    
    // Filter by subject
    if (subjectFilter) {
      results = results.filter(evaluation => evaluation.subject === subjectFilter);
    }
    
    // Filter by type
    if (typeFilter) {
      results = results.filter(evaluation => evaluation.type === typeFilter);
    }
    
    setFilteredEvaluations(results);
  }, [searchQuery, levelFilter, subjectFilter, typeFilter, evaluations]);

  const clearFilters = () => {
    setSearchQuery('');
    setLevelFilter('');
    setSubjectFilter('');
    setTypeFilter('');
  };

  // Extract unique subjects and levels for filter options
  const subjects = [...new Set(evaluations.map(e => e.subject))];
  const levels = [...new Set(evaluations.map(e => e.level))];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationMenu />
      
      <div className="p-4 md:p-8">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ClipboardList className="h-7 w-7" />
              Évaluations
            </h1>
            <p className="text-muted-foreground">Créez et gérez des évaluations formatives et sommatives</p>
          </div>
          <Button onClick={() => navigate('/evaluations/create')} className="bg-primary">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Évaluation
          </Button>
        </header>

        <Separator className="my-6" />
        
        {/* Filters */}
        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une évaluation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les niveaux</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Matière" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les matières</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  <SelectItem value="formative">Formative</SelectItem>
                  <SelectItem value="summative">Sommative</SelectItem>
                </SelectContent>
              </Select>
              
              {(searchQuery || levelFilter || subjectFilter || typeFilter) && (
                <Button variant="outline" onClick={clearFilters}>
                  Effacer les filtres
                </Button>
              )}
            </div>
          </div>
        </div>

        {filteredEvaluations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvaluations.map((evaluation) => (
              <EvaluationCard key={evaluation.id} evaluation={evaluation} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-muted-foreground mb-4">
              Aucune évaluation ne correspond à vos critères de recherche.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Effacer les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationsList;
