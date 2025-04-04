
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ClipboardList, FileText, Printer } from 'lucide-react';
import { Evaluation } from '@/types/evaluation';

interface EvaluationCardProps {
  evaluation: Evaluation;
}

const EvaluationCard: React.FC<EvaluationCardProps> = ({ evaluation }) => {
  return (
    <Card className="overflow-hidden border border-border/50 hover:shadow-md transition-all">
      <CardHeader className={`bg-muted/30 p-4 ${
        evaluation.type === 'formative' ? 'border-l-4 border-blue-400' : 'border-l-4 border-purple-400'
      }`}>
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          {evaluation.title}
        </CardTitle>
        <CardDescription>
          {evaluation.type === 'formative' ? 'Évaluation formative' : 'Évaluation sommative'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{evaluation.subject}</span>
            <span>Niveau: {evaluation.level}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{evaluation.term}</span>
            <span>{evaluation.maxScore} points</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date: {new Date(evaluation.date).toLocaleDateString('fr-FR')}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              evaluation.status === 'published' ? 'bg-green-100 text-green-800' :
              evaluation.status === 'draft' ? 'bg-amber-100 text-amber-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {evaluation.status === 'published' ? 'Publiée' :
               evaluation.status === 'draft' ? 'Brouillon' :
               'Archivée'}
            </span>
          </div>
          {evaluation.description && (
            <p className="text-sm mt-2">{evaluation.description}</p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2 justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/evaluations/${evaluation.id}`}>
            <FileText className="mr-1.5 h-4 w-4" />
            Voir
          </Link>
        </Button>
        <Button variant="default" size="sm">
          <Printer className="mr-1.5 h-4 w-4" />
          Imprimer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EvaluationCard;
