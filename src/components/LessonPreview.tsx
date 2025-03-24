
import { useState } from "react";
import { motion } from "framer-motion";

const lessonExamples = [
  {
    question: "¿Cómo estás hoy?",
    options: ["Estoy bien, gracias", "Soy bien", "Tengo bien", "Hago bien"],
    correctIndex: 0,
    explanation: "Usamos 'estoy' (forma de estar) para expresar estados temporales."
  },
  {
    question: "El sol ___ por el este.",
    options: ["sale", "sube", "llega", "aparece"],
    correctIndex: 0,
    explanation: "'Sale' es el verbo correcto para el fenómeno del amanecer."
  },
  {
    question: "¿___ es la capital de España?",
    options: ["Qué", "Cuál", "Dónde", "Cómo"],
    correctIndex: 2,
    explanation: "Usamos '¿Dónde?' para preguntar por lugares."
  }
];

const LessonPreview = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setShowExplanation(true);
  };
  
  const handleNextLesson = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentLesson((prev) => (prev + 1) % lessonExamples.length);
  };
  
  const lesson = lessonExamples[currentLesson];
  const isCorrect = selectedOption === lesson.correctIndex;

  return (
    <section className="section-padding">
      <div className="max-container">
        <div className="text-center mb-16 animate-slide-up">
          <div className="tag mb-4 mx-auto inline-flex">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Interactivo y efectivo
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aprende con ejercicios prácticos
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Nuestras lecciones combinan teoría con práctica inmediata para asegurar la retención y comprensión del idioma.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    {currentLesson + 1}
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Lección de ejemplo</p>
                    <p className="font-medium">Comprensión básica</p>
                  </div>
                </div>
                <div className="bg-secondary rounded-full h-2 w-24">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${((currentLesson + 1) / lessonExamples.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-6">
                {lesson.question}
              </h3>
              
              <div className="space-y-4 mb-8">
                {lesson.options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                      selectedOption === index
                        ? selectedOption === lesson.correctIndex
                          ? "border-green-500 bg-green-500/10"
                          : "border-red-500 bg-red-500/10"
                        : "border-border bg-background/50 hover:border-primary hover:bg-primary/5"
                    } ${selectedOption !== null ? "cursor-default" : "cursor-pointer"}`}
                    onClick={() => selectedOption === null && handleOptionClick(index)}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                        selectedOption === index
                          ? selectedOption === lesson.correctIndex
                            ? "border-green-500"
                            : "border-red-500"
                          : "border-foreground/30"
                      }`}>
                        {selectedOption === index && (
                          selectedOption === lesson.correctIndex ? (
                            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          ) : (
                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          )
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {showExplanation && (
                <div className="animate-slide-up border-t border-border pt-6 mb-6">
                  <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-500/10" : "bg-red-500/10"}`}>
                    <p className="font-medium mb-2">
                      {isCorrect ? "¡Correcto!" : "Incorrecto. La respuesta correcta es:"}
                      {!isCorrect && <span className="font-bold"> {lesson.options[lesson.correctIndex]}</span>}
                    </p>
                    <p className="text-sm">{lesson.explanation}</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button 
                  className={`button-primary ${
                    !showExplanation && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleNextLesson}
                  disabled={!showExplanation}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonPreview;
