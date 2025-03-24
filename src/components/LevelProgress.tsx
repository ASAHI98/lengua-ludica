
import { CheckCircle, Circle, Lock, Award } from "lucide-react";
import { getUserProgress, getLevelProgress, getNextLevel } from "@/services/UserProgress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LevelProgress = () => {
  const navigate = useNavigate();
  const userProgress = getUserProgress();
  const currentLevelProgress = getLevelProgress();
  const nextLevel = getNextLevel(userProgress.level);
  
  // Definir los niveles y su estado basado en el nivel actual del usuario
  const levels = [
    {
      level: "A1",
      name: "Principiante",
      progress: userProgress.level === "A1" ? currentLevelProgress : 100,
      status: userProgress.level === "A1" ? "in-progress" : 
              (["A2", "B1", "B2", "C1", "C2"].includes(userProgress.level) ? "completed" : "locked")
    },
    {
      level: "A2",
      name: "Elemental",
      progress: userProgress.level === "A2" ? currentLevelProgress : 
                (["B1", "B2", "C1", "C2"].includes(userProgress.level) ? 100 : 0),
      status: userProgress.level === "A2" ? "in-progress" : 
              (["B1", "B2", "C1", "C2"].includes(userProgress.level) ? "completed" : 
               (userProgress.level === "A1" ? "next" : "locked"))
    },
    {
      level: "B1",
      name: "Intermedio",
      progress: userProgress.level === "B1" ? currentLevelProgress : 
                (["B2", "C1", "C2"].includes(userProgress.level) ? 100 : 0),
      status: userProgress.level === "B1" ? "in-progress" : 
              (["B2", "C1", "C2"].includes(userProgress.level) ? "completed" : 
               (userProgress.level === "A2" ? "next" : "locked"))
    },
    {
      level: "B2",
      name: "Intermedio Alto",
      progress: userProgress.level === "B2" ? currentLevelProgress : 
                (["C1", "C2"].includes(userProgress.level) ? 100 : 0),
      status: userProgress.level === "B2" ? "in-progress" : 
              (["C1", "C2"].includes(userProgress.level) ? "completed" : 
               (userProgress.level === "B1" ? "next" : "locked"))
    },
    {
      level: "C1",
      name: "Avanzado",
      progress: userProgress.level === "C1" ? currentLevelProgress : 
                (userProgress.level === "C2" ? 100 : 0),
      status: userProgress.level === "C1" ? "in-progress" : 
              (userProgress.level === "C2" ? "completed" : 
               (userProgress.level === "B2" ? "next" : "locked"))
    },
    {
      level: "C2",
      name: "Dominio",
      progress: userProgress.level === "C2" ? 100 : 0,
      status: userProgress.level === "C2" ? "completed" : 
              (userProgress.level === "C1" ? "next" : "locked")
    }
  ];
  
  const handleContinueLearning = () => {
    navigate("/lecciones");
  };
  
  const handleTakeTest = () => {
    navigate("/evaluacion-inicial");
    toast.info("Esto te permitirá verificar tu nivel actual", {
      description: "Completar el test puede desbloquear niveles superiores"
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tu progreso</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleTakeTest}
        >
          <Award className="w-4 h-4" />
          Test de nivel
        </Button>
      </div>
      
      <div className="space-y-6">
        {levels.map((level, index) => (
          <div key={index} className="relative">
            {index !== levels.length - 1 && (
              <div className={`absolute left-6 top-10 w-0.5 h-full ${
                level.status === "completed" ? "bg-primary" : 
                (level.status === "in-progress" ? "bg-primary/50" : "bg-border")
              }`}></div>
            )}
            
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10">
                {level.status === "completed" ? (
                  <CheckCircle className="w-10 h-10 text-primary" />
                ) : level.status === "in-progress" ? (
                  <Circle className="w-10 h-10 text-primary" strokeWidth={1.5} />
                ) : level.status === "next" ? (
                  <Circle className="w-10 h-10 text-primary/40" strokeWidth={1.5} />
                ) : (
                  <Lock className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-secondary rounded text-xs font-medium mr-2">
                      {level.level}
                    </span>
                    <span className={`font-medium ${
                      level.status === "locked" ? "text-muted-foreground" : ""
                    }`}>
                      {level.name}
                    </span>
                    
                    {level.level === userProgress.level && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        Nivel actual
                      </span>
                    )}
                  </div>
                  <span className={`text-sm ${
                    level.status === "locked" ? "text-muted-foreground" : "text-foreground/70"
                  }`}>
                    {level.progress}% completado
                  </span>
                </div>
                
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      level.status === "locked" ? "bg-muted" : 
                      (level.status === "completed" ? "bg-primary" : 
                       (level.status === "in-progress" ? "bg-primary" : "bg-primary/40"))
                    }`}
                    style={{ width: `${level.progress}%` }}
                  ></div>
                </div>
                
                {level.status === "in-progress" && (
                  <button 
                    className="mt-3 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    onClick={handleContinueLearning}
                  >
                    Continuar aprendiendo
                  </button>
                )}
                
                {level.status === "next" && (
                  <div className="mt-3 text-sm text-foreground/70">
                    Desbloquea este nivel completando el nivel {level.level.charAt(0)}{parseInt(level.level.charAt(1))-1}
                  </div>
                )}
                
                {level.status === "completed" && (
                  <button 
                    className="mt-3 text-sm text-foreground/70 hover:text-foreground transition-colors"
                    onClick={handleContinueLearning}
                  >
                    Repasar lecciones
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 border border-border rounded-lg bg-card/50">
        <h3 className="text-md font-semibold mb-2">Consejo para avanzar</h3>
        <p className="text-sm text-foreground/70">
          {userProgress.level === "C2" ? 
            "¡Felicidades! Has alcanzado el máximo nivel. Ahora puedes repasar y perfeccionar tu español." :
            `Para avanzar al nivel ${nextLevel}, completa más lecciones y obtén ${
              userProgress.level === "A1" ? "500" : 
              userProgress.level === "A2" ? "1000" : 
              userProgress.level === "B1" ? "2000" : 
              userProgress.level === "B2" ? "3500" : "5000"
            } puntos.`
          }
        </p>
      </div>
    </div>
  );
};

export default LevelProgress;
