
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApiKey } from '@/hooks/use-api-key';
import ApiKeyInput from '@/components/ApiKeyInput';
import { useGeminiApiKey } from '@/hooks/use-gemini-api-key';
import GeminiApiKeyInput from '@/components/GeminiApiKeyInput';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const { apiKey, saveApiKey, clearApiKey, isLoaded } = useApiKey();
  const { apiKey: geminiApiKey, saveApiKey: saveGeminiApiKey, clearApiKey: clearGeminiApiKey, isLoaded: geminiLoaded } = useGeminiApiKey();

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-6 flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-6 w-6" />
          Paramètres
        </h1>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        <Tabs defaultValue="api">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="api">Clés API</TabsTrigger>
            <TabsTrigger value="app">Application</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Clés API pour les Modèles IA</CardTitle>
                <CardDescription>
                  Configurez vos clés API pour utiliser les fonctionnalités d'intelligence artificielle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoaded && (
                  <ApiKeyInput 
                    apiKey={apiKey}
                    onSave={saveApiKey}
                    onClear={clearApiKey}
                  />
                )}
                
                <Separator className="my-6" />
                
                {geminiLoaded && (
                  <GeminiApiKeyInput 
                    apiKey={geminiApiKey}
                    onSave={saveGeminiApiKey}
                    onClear={clearGeminiApiKey}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="app">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de l'Application</CardTitle>
                <CardDescription>
                  Configurez les préférences générales de l'application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Langue par défaut</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="bg-primary text-primary-foreground">
                      Français
                    </Button>
                    <Button variant="outline">
                      English
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Modèle de fiche par défaut</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      Standard
                    </Button>
                    <Button variant="outline" className="bg-primary text-primary-foreground">
                      Sénégalais
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
