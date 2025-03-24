
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-spanish-red/10 blur-3xl animate-float"></div>
        <div className="absolute top-[60%] -left-[10%] w-[30%] h-[30%] rounded-full bg-spanish-yellow/10 blur-3xl animate-float animation-delay-1000"></div>
      </div>
      
      <div className="max-container relative px-6 md:px-8 grid md:grid-cols-2 gap-12 md:gap-6 items-center">
        <div className="order-2 md:order-1 animate-slide-up">
          <div className="tag mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Aprendizaje inmersivo
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Descubre el arte de la 
            <span className="relative ml-2">
              <span className="relative z-10 bg-gradient-to-r from-spanish-red to-primary bg-clip-text text-transparent">
                lengua española
              </span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-spanish-yellow/30 -z-0"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg">
            Una experiencia de aprendizaje única y personalizada. Domina el español a tu ritmo con lecciones interactivas, ejercicios prácticos y feedback inmediato.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/lecciones" className="button-primary">
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="#metodologia" className="button-outline">
              Conocer metodología
            </Link>
          </div>
          
          <div className="mt-12 flex items-center space-x-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-medium"
                >
                  {i}
                </div>
              ))}
            </div>
            <p className="text-sm text-foreground/70">
              +10,000 estudiantes activos
            </p>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center md:justify-end animate-slide-up animation-delay-300">
          <div className="relative w-full max-w-md">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-spanish-red/20 to-spanish-yellow/20 p-6 glass-card">
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                Nivel A1 - C2
              </div>
              
              <div className="h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="font-serif text-xl font-bold mb-1">Prueba de nivel</h3>
                  <p className="text-sm text-foreground/70">Descubre tu nivel actual de español</p>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="space-y-4 mb-6">
                    {["Principiante", "Intermedio", "Avanzado", "Nativo"].map((level, i) => (
                      <div 
                        key={level} 
                        className={`relative p-4 rounded-lg border ${
                          i === 1 ? "border-primary bg-primary/5" : "border-border bg-background/50"
                        } transition-all duration-300 hover:border-primary hover:bg-primary/5 cursor-pointer`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border ${
                            i === 1 ? "border-primary" : "border-foreground/30"
                          } flex items-center justify-center mr-3`}>
                            {i === 1 && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className="font-medium">{level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="button-primary w-full">
                  Comenzar prueba
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
