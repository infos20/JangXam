
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import NavigationMenu from '@/components/NavigationMenu';
import { BookOpen, FileText, Loader2, Book } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Types for NotebookLM documents and concepts
interface Document {
  id: string;
  title: string;
  keywords: string[];
}

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface CardData {
  title: string;
  level: string;
  subject: string;
  objectives: string[];
  content: string;
  activities: string[];
  assessment: string;
}

const CreatePedagogicalCard = () => {
  // States for the pedagogical card creation flow
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [concepts, setConcepts] = useState<string[]>([]);
  const [questions, setQuestions] = useState<QuestionAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [generatedCard, setGeneratedCard] = useState<CardData | null>(null);

  // Mock function to simulate fetching documents from NotebookLM
  const fetchDocuments = () => {
    setLoading(true);
    
    // This would be replaced with an actual API call to NotebookLM
    setTimeout(() => {
      const mockDocuments: Document[] = [
        { 
          id: "doc1", 
          title: "Programme Maths CM2", 
          keywords: ["mathématiques", "primaire", "programme", "éducation nationale"]
        },
        { 
          id: "doc2", 
          title: "Programme Français CP", 
          keywords: ["français", "lecture", "écriture", "CP"]
        },
        { 
          id: "doc3", 
          title: "Guide pédagogique Sciences CE2", 
          keywords: ["sciences", "expériences", "CE2", "SVT"]
        }
      ];
      
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1500);
  };

  // Mock function to get document analysis from NotebookLM
  const analyzeDocument = (documentId: string) => {
    setLoading(true);
    
    // This would be replaced with an actual API call
    setTimeout(() => {
      let mockConcepts: string[];
      let mockQuestions: QuestionAnswer[];
      
      if (documentId === "doc1") {
        // Concepts for Maths CM2
        mockConcepts = ["Fractions", "Calcul mental", "Géométrie", "Problèmes"];
        mockQuestions = [
          { question: "Quel objectif prioritaire souhaitez-vous pour cette fiche ?", answer: "" },
          { question: "À quel moment de l'année scolaire cette fiche sera-t-elle utilisée ?", answer: "" },
          { question: "Quelles difficultés particulières avez-vous observées chez vos élèves ?", answer: "" }
        ];
      } else if (documentId === "doc2") {
        // Concepts for Français CP
        mockConcepts = ["Lecture", "Écriture", "Compréhension", "Vocabulaire"];
        mockQuestions = [
          { question: "Quel phonème souhaitez-vous travailler en priorité ?", answer: "" },
          { question: "Quel type de support utiliserez-vous (album, manuel, etc.) ?", answer: "" },
          { question: "Quel niveau de différenciation souhaitez-vous intégrer ?", answer: "" }
        ];
      } else {
        // Concepts for Sciences CE2
        mockConcepts = ["Matière", "Vivant", "Énergie", "Technologie"];
        mockQuestions = [
          { question: "Sur quelle partie du programme souhaitez-vous vous concentrer ?", answer: "" },
          { question: "Avez-vous du matériel spécifique disponible pour les expériences ?", answer: "" },
          { question: "Combien de séances prévoyez-vous pour cette séquence ?", answer: "" }
        ];
      }
      
      setConcepts(mockConcepts);
      setQuestions(mockQuestions);
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  // Function to handle selecting a document
  const selectDocument = (id: string) => {
    setSelectedDocumentId(id);
    analyzeDocument(id);
  };

  // Function to handle answering a question
  const handleAnswer = (answer: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].answer = answer;
    setQuestions(updatedQuestions);
  };

  // Function to move to the next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If all questions are answered, generate the card
      generateCard();
    }
  };

  // Function to generate the pedagogical card
  const generateCard = () => {
    setLoading(true);
    
    // In a real app, this would call Gemini API with the answers
    setTimeout(() => {
      const selectedDocument = documents.find(doc => doc.id === selectedDocumentId);
      
      // Mock response from Gemini
      const mockCard: CardData = {
        title: `Fiche pédagogique: ${concepts[0]}`,
        level: selectedDocumentId === "doc1" ? "CM2" : selectedDocumentId === "doc2" ? "CP" : "CE2",
        subject: selectedDocumentId === "doc1" ? "Mathématiques" : selectedDocumentId === "doc2" ? "Français" : "Sciences",
        objectives: [
          "Comprendre les concepts clés de " + concepts[0],
          "Développer des compétences pratiques",
          "Évaluer la progression des élèves"
        ],
        content: `Cette fiche pédagogique se concentre sur ${concepts[0]} pour les élèves de ${selectedDocumentId === "doc1" ? "CM2" : selectedDocumentId === "doc2" ? "CP" : "CE2"}.
        
        ${questions[0].answer ? `Objectif prioritaire: ${questions[0].answer}` : ""}
        ${questions[1].answer ? `Information contextuelle: ${questions[1].answer}` : ""}
        ${questions[2].answer ? `Considérations particulières: ${questions[2].answer}` : ""}`,
        activities: [
          `Activité 1: Introduction au concept de ${concepts[0]}`,
          `Activité 2: Exercices pratiques`,
          `Activité 3: Travail en groupes sur ${concepts[1] || concepts[0]}`
        ],
        assessment: `Évaluation formative par observation durant les activités et mini-quiz à la fin de la séance.`
      };
      
      setGeneratedCard(mockCard);
      setLoading(false);
      setStep(3);
    }, 3000);
  };

  // Function to export card as PDF (mock)
  const exportAsPdf = () => {
    toast.success("Export en PDF initié. Le téléchargement va commencer...");
    // In a real app, this would trigger a PDF generation and download
  };

  // Function to start over
  const startOver = () => {
    setSelectedDocumentId(null);
    setStep(1);
    setConcepts([]);
    setQuestions([]);
    setCurrentQuestion(0);
    setGeneratedCard(null);
  };

  // Initialize by fetching documents
  React.useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationMenu />
      
      <div className="container py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7" />
            Création de Fiche Pédagogique
          </h1>
          <p className="text-muted-foreground">
            Générez des fiches pédagogiques à partir de documents NotebookLM et avec l'assistance de Gemini
          </p>
        </header>
        
        <Separator className="my-6" />
        
        {/* Step indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <div className={`h-1 w-12 ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
            <div className={`h-1 w-12 ${step > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              3
            </div>
          </div>
        </div>
        
        <div className="grid gap-6">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Sélectionnez un document</CardTitle>
                <CardDescription>
                  Choisissez le document de NotebookLM à partir duquel vous souhaitez créer une fiche pédagogique
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {documents.map((document) => (
                      <div 
                        key={document.id}
                        className={`p-4 border rounded-md cursor-pointer transition-colors ${selectedDocumentId === document.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                        onClick={() => selectDocument(document.id)}
                      >
                        <div className="flex items-start gap-3">
                          <FileText className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <div>
                            <h3 className="font-medium">{document.title}</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {document.keywords.map((keyword, i) => (
                                <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Répondez aux questions</CardTitle>
                <CardDescription>
                  Gemini a analysé le document et pose des questions pour personnaliser votre fiche
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Concepts identifiés</h3>
                      <div className="flex flex-wrap gap-2">
                        {concepts.map((concept, i) => (
                          <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-md bg-muted/30">
                      <h4 className="font-medium mb-3">
                        Question {currentQuestion + 1} sur {questions.length}
                      </h4>
                      <p className="text-lg mb-4">{questions[currentQuestion]?.question}</p>
                      
                      <Textarea 
                        value={questions[currentQuestion]?.answer}
                        onChange={(e) => handleAnswer(e.target.value)}
                        placeholder="Votre réponse..."
                        className="min-h-[100px]"
                      />
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          onClick={nextQuestion} 
                          disabled={!questions[currentQuestion]?.answer}
                        >
                          {currentQuestion < questions.length - 1 ? 'Question suivante' : 'Générer la fiche'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {step === 3 && generatedCard && (
            <Card>
              <CardHeader>
                <CardTitle>Fiche Pédagogique Générée</CardTitle>
                <CardDescription>
                  Voici la fiche pédagogique générée à partir de vos réponses
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="border rounded-lg p-6 bg-card">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold">{generatedCard.title}</h2>
                    <div className="flex justify-center gap-3 mt-2">
                      <span className="badge bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {generatedCard.level}
                      </span>
                      <span className="badge bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {generatedCard.subject}
                      </span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Objectifs d'apprentissage</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {generatedCard.objectives.map((objective, i) => (
                        <li key={i}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Contenu</h3>
                    <p className="whitespace-pre-line">{generatedCard.content}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Activités proposées</h3>
                    <ol className="list-decimal pl-5 space-y-1">
                      {generatedCard.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Évaluation</h3>
                    <p>{generatedCard.assessment}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={startOver}>
                  Créer une nouvelle fiche
                </Button>
                <Button onClick={() => exportAsPdf()}>
                  Exporter en PDF
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connexion à NotebookLM</DialogTitle>
            <DialogDescription>
              Autorisez JàngXam à accéder à vos documents sur NotebookLM.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              Cette fonctionnalité nécessite que vous autorisiez l'accès à vos documents via OAuth.
            </p>
            <Button className="w-full" onClick={() => setDialogOpen(false)}>
              Autoriser l'accès
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePedagogicalCard;
