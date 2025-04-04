
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FilePlus, 
  BookOpen, 
  ImageIcon, 
  Settings as SettingsIcon 
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const NavigationMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems: NavItem[] = [
    {
      icon: Home,
      label: 'Accueil',
      path: '/',
    },
    {
      icon: FilePlus,
      label: 'Créer',
      path: '/create-lesson',
    },
    {
      icon: BookOpen,
      label: 'Leçons',
      path: '/lessons',
    },
    {
      icon: ImageIcon,
      label: 'Génération',
      path: '/generate',
    },
    {
      icon: SettingsIcon,
      label: 'Paramètres',
      path: '/settings',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-background border-b border-border/40 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-6">
            <BookOpen className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-lg hidden sm:inline">EduPlanr</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              size="sm"
              asChild
              className="sm:flex gap-2"
            >
              <Link to={item.path}>
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
