
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreateLesson from "./pages/CreateLesson";
import LessonDetail from "./pages/LessonDetail";
import EditLesson from "./pages/EditLesson";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import StudentsList from "./pages/StudentsList";
import StudentDetail from "./pages/StudentDetail";
import EvaluationsList from "./pages/EvaluationsList";
import EvaluationDetail from "./pages/EvaluationDetail";
import CreatePedagogicalCard from "./pages/CreatePedagogicalCard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/generate" element={<Index />} />
          <Route path="/create-lesson" element={<CreateLesson />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/edit-lesson/:id" element={<EditLesson />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Nouvelles routes pour la gestion des élèves */}
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          
          {/* Nouvelles routes pour les évaluations */}
          <Route path="/evaluations" element={<EvaluationsList />} />
          <Route path="/evaluations/:id" element={<EvaluationDetail />} />
          
          {/* Nouvelle route pour la création de fiches pédagogiques */}
          <Route path="/create-card" element={<CreatePedagogicalCard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
