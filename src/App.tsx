
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import Index from "./pages/Index";
import Lessons from "./pages/Lessons";
import DetalleLesson from "./pages/DetalleLesson";
import EvaluacionInicial from "./pages/EvaluacionInicial";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import Methodology from "./pages/Methodology";
import BlogPosts from "./pages/BlogPosts";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AccessibilityProvider>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/lecciones" element={<Lessons />} />
                <Route path="/leccion/:lessonId" element={<DetalleLesson />} />
                <Route path="/evaluacion-inicial" element={<EvaluacionInicial />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/metodologia" element={<Methodology />} />
                <Route path="/blog" element={<BlogPosts />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
