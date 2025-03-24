
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LevelProgress from "@/components/LevelProgress";
import { BookOpen, PlayCircle, FileText, MessageCircle, Mic, CheckSquare } from "lucide-react";

const lessonModules = [
  {
    title: "Gramática Básica",
    icon: <BookOpen className="w-5 h-5" />,
    lessons: [
      {
        title: "Artículos definidos e indefinidos",
        description: "Aprende a usar El, La, Los, Las, Un, Una, Unos, Unas",
        duration: "15 min",
        type: "Lección",
        icon: <BookOpen className="w-4 h-4" />,
        completed: true
      },
      {
        title: "Género y número",
        description: "Masculino, femenino, singular y plural",
        duration: "20 min",
        type: "Lección",
        icon: <BookOpen className="w-4 h-4" />,
        completed: true
      },
      {
        title: "Práctica: Artículos y sustantivos",
        description: "Ejercicios sobre lo aprendido",
        duration: "10 min",
        type: "Ejercicio",
        icon: <CheckSquare className="w-4 h-4" />,
        completed: false
      }
    ]
  },
  {
    title: "Vocabulario Esencial",
    icon: <FileText className="w-5 h-5" />,
    lessons: [
      {
        title: "Saludos y presentaciones",
        description: "Cómo saludar y presentarte en español",
        duration: "10 min",
        type: "Lección",
        icon: <BookOpen className="w-4 h-4" />,
        completed: true
      },
      {
        title: "Práctica de conversación",
        description: "Diálogos básicos de introducción",
        duration: "15 min",
        type: "Conversación",
        icon: <MessageCircle className="w-4 h-4" />,
        completed: false
      },
      {
        title: "Pronunciación básica",
        description: "Aprende a pronunciar correctamente",
        duration: "20 min",
        type: "Audio",
        icon: <Mic className="w-4 h-4" />,
        completed: false
      }
    ]
  },
  {
    title: "Verbos Presentes",
    icon: <PlayCircle className="w-5 h-5" />,
    lessons: [
      {
        title: "Verbos regulares: -AR, -ER, -IR",
        description: "Conjugación básica de verbos regulares",
        duration: "25 min",
        type: "Lección",
        icon: <BookOpen className="w-4 h-4" />,
        completed: false
      },
      {
        title: "Verbos comunes irregulares",
        description: "Ser, Estar, Ir, Tener y Hacer",
        duration: "30 min",
        type: "Lección",
        icon: <BookOpen className="w-4 h-4" />,
        completed: false
      }
    ]
  }
];

const Lessons = () => {
  const [activeTab, setActiveTab] = useState("lecciones"); // lecciones, progreso
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-container px-6 md:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Tus lecciones</h1>
            <p className="text-foreground/70 max-w-3xl">
              Continúa aprendiendo español a tu ritmo. Sigue el plan de estudios recomendado o explora los módulos según tus intereses.
            </p>
          </div>
          
          <div className="mb-8 border-b border-border">
            <div className="flex">
              <button
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "lecciones" 
                    ? "border-primary text-primary" 
                    : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
                onClick={() => setActiveTab("lecciones")}
              >
                Lecciones
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "progreso" 
                    ? "border-primary text-primary" 
                    : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
                onClick={() => setActiveTab("progreso")}
              >
                Progreso
              </button>
            </div>
          </div>
          
          {activeTab === "lecciones" ? (
            <div className="space-y-10 animate-fade-in">
              {lessonModules.map((module, moduleIndex) => (
                <div key={moduleIndex}>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      {module.icon}
                    </div>
                    <h2 className="text-xl font-bold">{module.title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lessonIndex} 
                        className={`glass-card p-6 hover:translate-y-[-5px] transition-all ${
                          lesson.completed ? "border-l-4 border-l-green-500" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              lesson.completed 
                                ? "bg-green-500/10 text-green-500" 
                                : "bg-primary/10 text-primary"
                            }`}>
                              {lesson.icon}
                            </div>
                            <span className="text-xs px-2 py-0.5 bg-secondary rounded">
                              {lesson.type}
                            </span>
                          </div>
                          <span className="text-xs text-foreground/60">
                            {lesson.duration}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2">
                          {lesson.title}
                        </h3>
                        
                        <p className="text-foreground/70 text-sm mb-4">
                          {lesson.description}
                        </p>
                        
                        <button 
                          className={`w-full py-2 px-4 rounded-lg border text-center text-sm font-medium transition-all ${
                            lesson.completed 
                              ? "border-green-500 text-green-500 hover:bg-green-500/10" 
                              : "border-primary text-primary hover:bg-primary/10"
                          }`}
                        >
                          {lesson.completed ? "Completado - Repasar" : "Comenzar lección"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in">
              <LevelProgress />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Lessons;
