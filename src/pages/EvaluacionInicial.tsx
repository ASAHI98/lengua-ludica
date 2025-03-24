
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const questionsData = [
  {
    id: 1,
    question: "¿Cuál de estas palabras es un verbo?",
    options: ["Casa", "Correr", "Rojo", "Libro"],
    correctAnswer: "Correr",
    level: "A1"
  },
  {
    id: 2,
    question: "¿Cuál es el plural correcto de 'lápiz'?",
    options: ["lápizes", "lápis", "lápices", "lápizs"],
    correctAnswer: "lápices",
    level: "A1"
  },
  {
    id: 3,
    question: "¿Qué tiempo verbal se utiliza en la frase: 'Mañana iré al cine'?",
    options: ["Presente", "Pretérito perfecto", "Futuro simple", "Condicional"],
    correctAnswer: "Futuro simple",
    level: "A2"
  },
  {
    id: 4,
    question: "Identifica la preposición en la siguiente frase: 'El libro está sobre la mesa'",
    options: ["El", "Está", "Sobre", "Mesa"],
    correctAnswer: "Sobre",
    level: "A2"
  },
  {
    id: 5,
    question: "¿Cuál de estas oraciones utiliza correctamente el subjuntivo?",
    options: [
      "Espero que vienes pronto",
      "Espero que vendrás pronto",
      "Espero que vengas pronto",
      "Espero que venía pronto"
    ],
    correctAnswer: "Espero que vengas pronto",
    level: "B1"
  },
  {
    id: 6,
    question: "En la frase 'Se lo dije', ¿a qué se refiere 'lo'?",
    options: [
      "A la persona a quien se habla", 
      "Al objeto directo de la acción", 
      "A la acción realizada", 
      "Al tiempo en que ocurrió"
    ],
    correctAnswer: "Al objeto directo de la acción",
    level: "B1"
  },
  {
    id: 7,
    question: "Completa el refrán: 'A caballo regalado...'",
    options: [
      "no le mires el diente", 
      "no le mires el pelo", 
      "no hay que montarlo", 
      "siempre hay que agradecerlo"
    ],
    correctAnswer: "no le mires el diente",
    level: "B2"
  },
  {
    id: 8,
    question: "¿Cuál es el significado de la palabra 'efímero'?",
    options: [
      "Duradero", 
      "De corta duración", 
      "Extraordinario", 
      "Eficiente"
    ],
    correctAnswer: "De corta duración",
    level: "B2"
  },
  {
    id: 9,
    question: "¿Qué figura literaria se utiliza en 'Sus cabellos son de oro'?",
    options: [
      "Símil", 
      "Hipérbole", 
      "Metáfora", 
      "Personificación"
    ],
    correctAnswer: "Metáfora",
    level: "C1"
  },
  {
    id: 10,
    question: "¿Qué tipo de subordinada es 'que me regalaste' en 'El libro que me regalaste es interesante'?",
    options: [
      "Subordinada sustantiva", 
      "Subordinada adjetiva o de relativo", 
      "Subordinada adverbial", 
      "No es una subordinada"
    ],
    correctAnswer: "Subordinada adjetiva o de relativo",
    level: "C1"
  }
];

const EvaluacionInicial = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questionsData.length).fill(""));
  const [showResults, setShowResults] = useState(false);
  const [assignedLevel, setAssignedLevel] = useState("");
  
  const handleAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
    
    // Avanzar a la siguiente pregunta con un pequeño delay
    setTimeout(() => {
      if (currentQuestion < questionsData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults();
      }
    }, 500);
  };
  
  const calculateResults = () => {
    const results = {
      A1: 0,
      A2: 0,
      B1: 0,
      B2: 0,
      C1: 0
    };
    
    // Contar respuestas correctas por nivel
    questionsData.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        results[question.level as keyof typeof results]++;
      }
    });
    
    // Determinar nivel basado en respuestas correctas
    let level = "A1";
    
    if (results.C1 >= 1 && results.B2 >= 1) {
      level = "C1";
    } else if (results.B2 >= 1 && results.B1 >= 1) {
      level = "B2";
    } else if (results.B1 >= 1 && results.A2 >= 1) {
      level = "B1";
    } else if (results.A2 >= 1 && results.A1 >= 1) {
      level = "A2";
    }
    
    setAssignedLevel(level);
    setShowResults(true);
    
    // Guardar el nivel en localStorage
    localStorage.setItem("userLevel", level);
    
    // Mostrar toast de éxito
    toast.success("¡Evaluación completada!", {
      description: `Has sido asignado al nivel ${level}`
    });
  };
  
  const handleStartLessons = () => {
    navigate("/lecciones");
  };
  
  const progressPercentage = ((currentQuestion + 1) / questionsData.length) * 100;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full">
          {!showResults ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
            >
              <div className="p-8">
                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Evaluación de nivel</h1>
                  <p className="text-foreground/70">
                    Pregunta {currentQuestion + 1} de {questionsData.length}
                  </p>
                  <div className="w-full bg-secondary h-2 rounded-full mt-4">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-300" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">
                    {questionsData[currentQuestion].question}
                  </h2>
                  <div className="space-y-3">
                    {questionsData[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-4 text-left rounded-lg border transition-all ${
                          selectedAnswers[currentQuestion] === option
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 text-center"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary">{assignedLevel}</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">¡Evaluación completada!</h1>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                Basado en tus respuestas, hemos determinado que tu nivel actual es <strong>{assignedLevel}</strong>. 
                Hemos personalizado tu ruta de aprendizaje de acuerdo a este nivel.
              </p>
              
              <Button size="lg" onClick={handleStartLessons}>
                Comenzar mis lecciones
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EvaluacionInicial;
