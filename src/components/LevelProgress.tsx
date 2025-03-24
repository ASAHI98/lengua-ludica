
import { CheckCircle, Circle, Lock } from "lucide-react";

const levels = [
  {
    level: "A1",
    name: "Principiante",
    progress: 100,
    status: "completed" // completed, in-progress, locked
  },
  {
    level: "A2",
    name: "Elemental",
    progress: 65,
    status: "in-progress"
  },
  {
    level: "B1",
    name: "Intermedio",
    progress: 0,
    status: "locked"
  },
  {
    level: "B2",
    name: "Intermedio Alto",
    progress: 0,
    status: "locked"
  },
  {
    level: "C1",
    name: "Avanzado",
    progress: 0,
    status: "locked"
  },
  {
    level: "C2",
    name: "Dominio",
    progress: 0,
    status: "locked"
  }
];

const LevelProgress = () => {
  return (
    <div className="w-full max-w-3xl mx-auto glass-card p-8">
      <h2 className="text-2xl font-bold mb-6">Tu progreso</h2>
      
      <div className="space-y-6">
        {levels.map((level, index) => (
          <div key={index} className="relative">
            {index !== levels.length - 1 && (
              <div className={`absolute left-6 top-10 w-0.5 h-full ${
                level.status === "completed" ? "bg-primary" : "bg-border"
              }`}></div>
            )}
            
            <div className="flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10">
                {level.status === "completed" ? (
                  <CheckCircle className="w-10 h-10 text-primary" />
                ) : level.status === "in-progress" ? (
                  <Circle className="w-10 h-10 text-primary" strokeWidth={1.5} />
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
                      level.status === "locked" ? "bg-muted" : "bg-primary"
                    }`}
                    style={{ width: `${level.progress}%` }}
                  ></div>
                </div>
                
                {level.status === "in-progress" && (
                  <button className="mt-3 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                    Continuar aprendiendo
                  </button>
                )}
                
                {level.status === "completed" && (
                  <button className="mt-3 text-sm text-foreground/70 hover:text-foreground transition-colors">
                    Repasar lecciones
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelProgress;
