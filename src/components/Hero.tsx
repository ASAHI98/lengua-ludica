
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleStartLearning = () => {
    navigate("/evaluacion-inicial");
  };
  
  const handleViewLessons = () => {
    navigate("/lecciones");
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center py-20 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/6 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="max-container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="tag mb-6 mx-auto inline-flex">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Aprende español de manera divertida
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Domina el español con lecciones 
            <span className="text-primary"> interactivas</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Aprende español a tu ritmo con nuestro enfoque personalizado, ejercicios interactivos y contenido adaptado a tu nivel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={handleStartLearning}
            >
              Comenzar a aprender
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={handleViewLessons}
            >
              Ver lecciones
              <PlayCircle className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-8 justify-center">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="font-bold">A1</span>
              </div>
              <div className="ml-3 text-left">
                <p className="font-medium">Principiante</p>
                <p className="text-sm text-foreground/70">Primeros pasos</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="font-bold">B1</span>
              </div>
              <div className="ml-3 text-left">
                <p className="font-medium">Intermedio</p>
                <p className="text-sm text-foreground/70">Conversación diaria</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="font-bold">C1</span>
              </div>
              <div className="ml-3 text-left">
                <p className="font-medium">Avanzado</p>
                <p className="text-sm text-foreground/70">Fluidez nativa</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
