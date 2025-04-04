
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, User } from 'lucide-react';
import { toast } from 'sonner';

interface UserSettings {
  name: string;
  email: string;
  schoolName: string;
  darkMode: boolean;
  defaultSubject: string;
  autoSave: boolean;
  notificationsEnabled: boolean;
}

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>({
    name: 'Jean Dupont',
    email: 'jean.dupont@education.fr',
    schoolName: 'École Primaire Jules Ferry',
    darkMode: true,
    defaultSubject: 'Français',
    autoSave: true,
    notificationsEnabled: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to localStorage or an API
    toast.success('Paramètres enregistrés avec succès');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Paramètres</h1>
        </div>
        <p className="text-muted-foreground">Personnalisez votre expérience d'utilisation</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input 
                id="name" 
                name="name" 
                value={settings.name} 
                onChange={handleChange} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                value={settings.email} 
                onChange={handleChange} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolName">Nom de l'école</Label>
              <Input 
                id="schoolName" 
                name="schoolName" 
                value={settings.schoolName} 
                onChange={handleChange} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Préférences de l'application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Mode sombre</h3>
                <p className="text-sm text-muted-foreground">Activer l'interface en mode sombre</p>
              </div>
              <Switch 
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSwitchChange('darkMode', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sauvegarde automatique</h3>
                <p className="text-sm text-muted-foreground">Enregistrer automatiquement vos modifications</p>
              </div>
              <Switch 
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSwitchChange('autoSave', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">Recevoir des notifications dans l'application</p>
              </div>
              <Switch 
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => handleSwitchChange('notificationsEnabled', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="defaultSubject">Matière par défaut</Label>
                <Select 
                  value={settings.defaultSubject} 
                  onValueChange={(value) => handleSelectChange('defaultSubject', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Français">Français</SelectItem>
                    <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                    <SelectItem value="Sciences">Sciences</SelectItem>
                    <SelectItem value="Histoire">Histoire</SelectItem>
                    <SelectItem value="Géographie">Géographie</SelectItem>
                    <SelectItem value="Musique">Musique</SelectItem>
                    <SelectItem value="Arts Plastiques">Arts Plastiques</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Annuler
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Enregistrer les paramètres
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
