
import React from 'react';
import NavigationMenu from '@/components/NavigationMenu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ClipboardList, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import JangXamFeatures from '@/components/JangXamFeatures';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationMenu />
      <div className="container py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <p className="text-muted-foreground">Accédez rapidement aux fonctionnalités de JàngXam</p>
        </header>
        
        <JangXamFeatures />
      </div>
    </div>
  );
};

export default Dashboard;
