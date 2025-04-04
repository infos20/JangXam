
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, ClipboardEdit, Download, Edit, Printer, School, BookOpen, CheckSquare } from 'lucide-react';
import { Evaluation } from '@/types/evaluation';

const EvaluationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In real app, fetch data from API
    setLoading(true);
    
    // Sample evaluation based on ID
    const mockEvaluation: Evaluation = {
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
          correctAnswer: 'mange',
          points: 2
        },
        {
          id: 2,
          type: 'multiple_choice',
          text: 'Quelle est la terminaison des verbes du 1er groupe à la 3ème personne du pluriel au présent ?',
          options: ['-ent', '-ont', '-e', '-es'],
          correctAnswer: '-ent',
          points: 2
        },
        {
          id: 3,
          type: 'short_answer',
          text: 'Conjuguez le verbe "parler" à la 1ère personne du pluriel au présent.',
          correctAnswer: 'parlons',
          points: 3
        },
        {
          id: 4,
          type: 'fill_blank',
          text: 'Vous ____ (chanter) très bien.',
          correctAnswer: 'chantez',
          points: 2
        },
        {
          id: 5,
          type: 'multiple_choice',
          text: 'Lequel de ces verbes n\'est pas du premier groupe ?',
          options: ['marcher', 'sauter', 'venir', 'jouer'],
          correctAnswer: 'venir',
          points: 3
        },
        {
          id: 6,
          type: 'essay',
          text: 'Écrivez un petit paragraphe en utilisant au moins 5 verbes du premier groupe conjugués au présent.',
          points: 8
        }
      ],
      status: 'published'
    };
    
    // Simulate API call
    setTimeout(() => {
      setEvaluation(mockEvaluation);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationMenu />
        <div className="p-8 flex justify-center items-center">
          <p>Chargement de l'évaluation...</p>
        </div>
      </div>
    );
  }
  
  if (!evaluation) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationMenu />
        <div className="p-8 flex justify-center items-center">
          <p>Évaluation non trouvée</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <NavigationMenu />
      
      <div className="p-4 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/evaluations')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>
        </div>
        
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ClipboardEdit className="h-7 w-7" />
              {evaluation.title}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <School className="h-4 w-4" />
                <span>Niveau: {evaluation.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Matière: {evaluation.subject}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Date: {new Date(evaluation.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckSquare className="h-4 w-4" />
                <span>Points: {evaluation.maxScore}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/evaluations/edit/${evaluation.id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button variant="default">
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Télécharger PDF
            </Button>
          </div>
        </header>
        
        <Separator className="my-6" />
        
        {evaluation.description && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{evaluation.description}</p>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Questions ({evaluation.questions.length})</CardTitle>
            <CardDescription>Total: {evaluation.maxScore} points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {evaluation.questions.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Question {index + 1}</h3>
                    <span className="text-sm text-muted-foreground">{question.points} point{question.points > 1 ? 's' : ''}</span>
                  </div>
                  
                  <p className="mb-4">{question.text}</p>
                  
                  {question.type === 'multiple_choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            option === question.correctAnswer ? 
                              'bg-green-100 border-green-500 text-green-500' : 
                              'border-gray-300'
                          }`}>
                            {option === question.correctAnswer && (
                              <CheckSquare className="h-3 w-3" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'fill_blank' && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-1">Réponse correcte:</p>
                      <p className="font-medium">{question.correctAnswer}</p>
                    </div>
                  )}
                  
                  {question.type === 'short_answer' && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-1">Réponse correcte:</p>
                      <p className="font-medium">{question.correctAnswer}</p>
                    </div>
                  )}
                  
                  {question.type === 'essay' && (
                    <div className="mt-2 p-3 bg-muted/30 rounded border-dashed border">
                      <p className="text-sm text-muted-foreground italic">Espace pour la rédaction</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvaluationDetail;
