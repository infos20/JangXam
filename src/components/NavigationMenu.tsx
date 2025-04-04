import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { BookOpen, ClipboardList, Users, Settings as SettingsIcon } from 'lucide-react';

const MainNav = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>
              <ClipboardList className="mr-2 h-4 w-4" />
              Tableau de Bord
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/students" className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>
              <Users className="mr-2 h-4 w-4" />
              Élèves
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/evaluations" className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>
              <ClipboardList className="mr-2 h-4 w-4" />
              Évaluations
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/create-card" className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>
              <BookOpen className="mr-2 h-4 w-4" />
              Fiches Pédagogiques
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/settings" className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>
              <SettingsIcon className="mr-2 h-4 w-4" />
              Paramètres
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;

