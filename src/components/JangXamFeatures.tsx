
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ClipboardList, Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JangXamFeatures = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Élèves',
      description: 'Gérer les informations des élèves et consulter leurs dossiers.',
      icon: <Users className="h-8 w-8 text-primary" />,
      action: () => navigate('/students'),
    },
    {
      title: 'Évaluations',
      description: 'Créer et gérer les évaluations pour mesurer les progrès.',
      icon: <ClipboardList className="h-8 w-8 text-primary" />,
      action: () => navigate('/evaluations'),
    },
    {
      title: 'Fiches Pédagogiques',
      description: 'Créer des fiches pédagogiques structurées et adaptées.',
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      action: () => navigate('/create-card'),
    },
    {
      title: 'Générer du Contenu',
      description: 'Créer des leçons et du matériel pédagogique avec l\'IA.',
      icon: <FileText className="h-8 w-8 text-primary" />,
      action: () => navigate('/generate'),
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={feature.action}
        >
          <CardHeader>
            <div className="flex justify-center">{feature.icon}</div>
            <CardTitle className="text-center mt-4">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JangXamFeatures;
