
import { toast } from "sonner";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Interface pour la demande de génération de fiche pédagogique
export interface FichePedagogiqueRequest {
  niveau: string;
  titre: string;
  etape?: string;
  activites?: string;
  numero?: string;
  duree?: string;
  date?: string;
  palier?: string;
}

// Interface pour le modèle de fiche pédagogique sénégalaise
export interface FichePedagogiqueSenegalaise {
  titre: string;
  niveau: string;
  etape?: string;
  activites: string;
  numero: string;
  duree: string;
  date: string;
  competenceBase: string;
  palier: string;
  objectifApprentissage: string;
  objectifsSpecifiques: string;
  contenu: string;
  moyensPedagogiques: string;
  moyensMateriels: string;
  documentation: string;
  objectifLecon: string;
  deroulementLecon: {
    miseEnSituation: {
      enseignant: string;
      eleves: string;
    };
    explorationAcquis: {
      enseignant: string;
      eleves: string;
    };
    constructionSavoir: {
      enseignant: string;
      eleves: string;
    };
    approfondissement: {
      enseignant: string;
      eleves: string;
    };
    production: {
      enseignant: string;
      eleves: string;
    };
    evaluation: {
      enseignant: string;
      eleves: string;
    };
  };
  exercices: {
    qcm: {
      question: string;
      options: string[];
      reponseCorrecte: string;
    };
    texteATrous: {
      texte: string;
      reponse: string;
    };
    exerciceApplication: {
      consigne: string;
      exempleReponse: string;
    };
  };
}

// Fonction pour générer une fiche pédagogique avec Gemini
export const generateFichePedagogique = async (
  apiKey: string,
  data: FichePedagogiqueRequest
): Promise<FichePedagogiqueSenegalaise | null> => {
  try {
    // Construction du prompt pour Gemini
    const prompt = `Génère une fiche pédagogique détaillée conforme au programme scolaire sénégalais 🇸🇳 pour le niveau ${data.niveau}, avec le titre "${data.titre}".
    Adapte les contenus à la réalité éducative du Sénégal en intégrant des exemples du quotidien, des références culturelles et des contextes locaux.
    
    Format requis:
    - Étape: ${data.etape || ""}
    - Niveau: ${data.niveau} (Préciser le contexte scolaire)
    - Activités: ${data.activites || ""}
    - N°: ${data.numero || ""}
    - Durée: ${data.duree || ""}
    - Date: ${data.date || ""}
    
    Inclure:
    - Compétence de base: Identifier la compétence à développer selon les référentiels sénégalais.
    - Palier ${data.palier || ""}: Identifier la compétence à développer dans le palier selon les référentiels sénégalais.
    - Objectif d'apprentissage (OA): Définir l'objectif global de la leçon.
    - Objectif spécifique (OS): Détail des compétences précises à acquérir.
    - Contenu: Présenter les notions abordées.
    - Moyens pédagogiques: Indiquer les méthodes utilisées (discussion, observation, jeux éducatifs, etc.).
    - Moyens matériels: Mentionner les ressources nécessaires (ardoises, images, contes africains, objets du quotidien, etc.).
    - Documentation: Lister les documents de référence utilisés (manuel scolaire, guide pédagogique, etc.).
    - Objectif de la leçon: Expliquer ce que les élèves doivent être capables de faire après la leçon.
    
    Déroulement de la leçon:
    Structuré en 6 étapes (mise en situation, exploration des acquis, construction du savoir, approfondissement, production, évaluation) avec pour chacune les activités de l'enseignant et des élèves.
    
    Exercices:
    - QCM avec question et 4 options (une correcte)
    - Texte à trous
    - Exercice d'application avec exemple de réponse correcte
    
    Réponds en format JSON avec les champs correspondants.`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    };

    const apiKeyParam = `?key=${apiKey}`;
    const response = await fetch(`${GEMINI_API_URL}${apiKeyParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(`Erreur API Gemini: ${errorData.error?.message || "Erreur inconnue"}`);
      return null;
    }

    const responseData = await response.json();
    const generatedText = responseData.candidates[0]?.content?.parts[0]?.text || "";
    
    // Extraction du contenu JSON de la réponse
    let jsonMatch;
    try {
      // Essai d'extraction directe
      const parsedResponse = JSON.parse(generatedText.trim());
      return processGeminiResponse(parsedResponse, data);
    } catch (e) {
      // Recherche d'un bloc JSON dans le texte
      jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const jsonContent = jsonMatch[0];
          const parsedResponse = JSON.parse(jsonContent);
          return processGeminiResponse(parsedResponse, data);
        } catch (jsonError) {
          console.error("Erreur lors du parsing JSON:", jsonError);
          toast.error("Impossible d'extraire les données de la fiche pédagogique");
          return null;
        }
      } else {
        console.error("Pas de JSON trouvé dans la réponse");
        toast.error("Format de réponse non reconnu");
        return null;
      }
    }
  } catch (error) {
    console.error("Erreur lors de la génération de la fiche:", error);
    toast.error("Erreur lors de la génération de la fiche pédagogique");
    return null;
  }
};

// Fonction pour traiter et structurer la réponse de Gemini
function processGeminiResponse(response: any, originalRequest: FichePedagogiqueRequest): FichePedagogiqueSenegalaise {
  // Structure par défaut avec les données de base
  const fichePedagogique: FichePedagogiqueSenegalaise = {
    titre: response.titre || originalRequest.titre || "",
    niveau: response.niveau || originalRequest.niveau || "",
    etape: response.etape || originalRequest.etape || "",
    activites: response.activites || originalRequest.activites || "",
    numero: response.numero || originalRequest.numero || "",
    duree: response.duree || originalRequest.duree || "",
    date: response.date || originalRequest.date || new Date().toISOString().split('T')[0],
    competenceBase: response.competenceBase || "",
    palier: response.palier || originalRequest.palier || "",
    objectifApprentissage: response.objectifApprentissage || response.objectifDApprentissage || "",
    objectifsSpecifiques: response.objectifsSpecifiques || response.objectifSpecifique || "",
    contenu: response.contenu || "",
    moyensPedagogiques: response.moyensPedagogiques || "",
    moyensMateriels: response.moyensMateriels || "",
    documentation: response.documentation || "",
    objectifLecon: response.objectifLecon || response.objectifDeLaLecon || "",
    deroulementLecon: {
      miseEnSituation: {
        enseignant: response.deroulementLecon?.miseEnSituation?.enseignant || "",
        eleves: response.deroulementLecon?.miseEnSituation?.eleves || ""
      },
      explorationAcquis: {
        enseignant: response.deroulementLecon?.explorationAcquis?.enseignant || "",
        eleves: response.deroulementLecon?.explorationAcquis?.eleves || ""
      },
      constructionSavoir: {
        enseignant: response.deroulementLecon?.constructionSavoir?.enseignant || "",
        eleves: response.deroulementLecon?.constructionSavoir?.eleves || ""
      },
      approfondissement: {
        enseignant: response.deroulementLecon?.approfondissement?.enseignant || "",
        eleves: response.deroulementLecon?.approfondissement?.eleves || ""
      },
      production: {
        enseignant: response.deroulementLecon?.production?.enseignant || "",
        eleves: response.deroulementLecon?.production?.eleves || ""
      },
      evaluation: {
        enseignant: response.deroulementLecon?.evaluation?.enseignant || "",
        eleves: response.deroulementLecon?.evaluation?.eleves || ""
      }
    },
    exercices: {
      qcm: {
        question: response.exercices?.qcm?.question || "",
        options: response.exercices?.qcm?.options || ["", "", "", ""],
        reponseCorrecte: response.exercices?.qcm?.reponseCorrecte || ""
      },
      texteATrous: {
        texte: response.exercices?.texteATrous?.texte || "",
        reponse: response.exercices?.texteATrous?.reponse || ""
      },
      exerciceApplication: {
        consigne: response.exercices?.exerciceApplication?.consigne || "",
        exempleReponse: response.exercices?.exerciceApplication?.exempleReponse || ""
      }
    }
  };

  return fichePedagogique;
}
