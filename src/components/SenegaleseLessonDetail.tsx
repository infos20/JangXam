
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Check, HelpCircle } from 'lucide-react';

interface SenegaleseLessonDetailProps {
  lesson: any; // Utiliser le type FichePedagogiqueSenegalaise dans un cas réel
}

const SenegaleseLessonDetail: React.FC<SenegaleseLessonDetailProps> = ({ lesson }) => {
  // Si le format de la leçon ne correspond pas au modèle sénégalais
  if (!lesson.competenceBase) {
    return (
      <div className="text-center py-8">
        <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-lg text-muted-foreground">
          Cette fiche n'utilise pas le modèle pédagogique sénégalais.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Compétences et Objectifs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Compétence de base</h3>
              <p>{lesson.competenceBase}</p>
            </div>
            
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Palier {lesson.palier}</h3>
              <p>{lesson.palier}</p>
            </div>
            
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Objectif d'apprentissage (OA)</h3>
              <p>{lesson.objectifApprentissage}</p>
            </div>
            
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Objectifs spécifiques (OS)</h3>
              <pre className="whitespace-pre-wrap font-sans">{lesson.objectifsSpecifiques}</pre>
            </div>
            
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Objectif de la leçon</h3>
              <p>{lesson.objectifLecon}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contenu et Moyens</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Contenu</h3>
              <p>{lesson.contenu}</p>
            </div>
            
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Moyens pédagogiques</h3>
              <p>{lesson.moyensPedagogiques}</p>
            </div>
            
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Moyens matériels</h3>
              <p>{lesson.moyensMateriels}</p>
            </div>
            
            <div>
              <h3 className="text-base font-medium text-muted-foreground mb-1">Documentation</h3>
              <p>{lesson.documentation}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Déroulement de la leçon</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Étapes</TableHead>
                <TableHead className="w-1/2">Activités de l'enseignant</TableHead>
                <TableHead className="w-1/4">Activités des élèves</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1. Mise en situation / Motivation</TableCell>
                <TableCell>{lesson.deroulementLecon?.miseEnSituation?.enseignant}</TableCell>
                <TableCell>{lesson.deroulementLecon?.miseEnSituation?.eleves}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2. Exploration des acquis / Prérequis</TableCell>
                <TableCell>{lesson.deroulementLecon?.explorationAcquis?.enseignant}</TableCell>
                <TableCell>{lesson.deroulementLecon?.explorationAcquis?.eleves}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">3. Construction du savoir / Apprentissage actif</TableCell>
                <TableCell>{lesson.deroulementLecon?.constructionSavoir?.enseignant}</TableCell>
                <TableCell>{lesson.deroulementLecon?.constructionSavoir?.eleves}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">4. Approfondissement / Pratique guidée</TableCell>
                <TableCell>{lesson.deroulementLecon?.approfondissement?.enseignant}</TableCell>
                <TableCell>{lesson.deroulementLecon?.approfondissement?.eleves}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5. Production / Transfert des acquis</TableCell>
                <TableCell>{lesson.deroulementLecon?.production?.enseignant}</TableCell>
                <TableCell>{lesson.deroulementLecon?.production?.eleves}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">6. Évaluation et remédiation</TableCell>
                <TableCell>{lesson.deroulementLecon?.evaluation?.enseignant}</TableCell>
                <TableCell>{lesson.deroulementLecon?.evaluation?.eleves}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Exercices et Corrigés</h2>
          
          <div className="space-y-6">
            <div className="bg-secondary/20 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">1️⃣ QCM (Question à Choix Multiples)</h3>
              <p className="mb-4">{lesson.exercices?.qcm?.question}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                {lesson.exercices?.qcm?.options.map((option: string, index: number) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md border ${option === lesson.exercices?.qcm?.reponseCorrecte ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-border'}`}
                  >
                    <div className="flex items-center">
                      {option === lesson.exercices?.qcm?.reponseCorrecte && (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      )}
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-secondary/20 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">2️⃣ Texte à trous</h3>
              <p className="mb-4">{lesson.exercices?.texteATrous?.texte.replace('___', `<span class="bg-primary/20 px-1 rounded">___</span>`)}</p>
              
              <div className="flex items-center mt-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Réponse: {lesson.exercices?.texteATrous?.reponse}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-secondary/20 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">3️⃣ Exercice d'application</h3>
              <p className="mb-4">{lesson.exercices?.exerciceApplication?.consigne}</p>
              
              <div className="bg-secondary/30 p-3 rounded-md">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Exemple de réponse correcte:</h4>
                <p>{lesson.exercices?.exerciceApplication?.exempleReponse}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SenegaleseLessonDetail;
