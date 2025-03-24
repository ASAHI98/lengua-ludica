
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Mic, VolumeX, Volume2, CheckCircle } from "lucide-react";

interface LessonContentProps {
  title: string;
  description: string;
  content: ContentBlock[];
  onComplete: () => void;
}

export type ContentBlock = 
  | { type: "text"; content: string }
  | { type: "example"; content: string; translation?: string }
  | { type: "exercise"; question: string; options: string[]; correctAnswer: string }
  | { type: "audio"; content: string; audioUrl: string }
  | { type: "matching"; pairs: {spanish: string; meaning: string}[] };

const LessonContent = ({ title, description, content, onComplete }: LessonContentProps) => {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string | number[]}>({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<{[key: number]: boolean}>({});
  const [isAudioPlaying, setIsAudioPlaying] = useState<{[key: number]: boolean}>({});
  
  const currentBlock = content[currentBlockIndex];
  const isLastBlock = currentBlockIndex === content.length - 1;
  const hasAnsweredCurrent = selectedAnswers[currentBlockIndex] !== undefined;
  
  const handleNext = () => {
    if (currentBlockIndex < content.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
    } else {
      onComplete();
    }
  };
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentBlockIndex]: answer });
    
    if (currentBlock.type === "exercise") {
      const isCorrect = answer === currentBlock.correctAnswer;
      setShowCorrectAnswer({ ...showCorrectAnswer, [currentBlockIndex]: true });
      
      // Avanzar automáticamente después de un breve retraso
      if (isCorrect && !isLastBlock) {
        setTimeout(() => {
          handleNext();
        }, 1500);
      }
    }
  };
  
  const toggleAudio = (index: number) => {
    setIsAudioPlaying({ ...isAudioPlaying, [index]: !isAudioPlaying[index] });
  };
  
  const handleMatchingSelection = (index: number, pairIndex: number) => {
    const currentSelection: number[] = (selectedAnswers[index] as number[]) || [];
    const newSelection = [...currentSelection];
    
    if (newSelection.includes(pairIndex)) {
      // Deseleccionar
      const position = newSelection.indexOf(pairIndex);
      newSelection.splice(position, 1);
    } else {
      // Seleccionar (máximo 2 elementos)
      if (newSelection.length < 2) {
        newSelection.push(pairIndex);
      } else {
        // Reemplazar el primer elemento seleccionado
        newSelection.shift();
        newSelection.push(pairIndex);
      }
    }
    
    setSelectedAnswers({ ...selectedAnswers, [index]: newSelection });
    
    // Verificar si ha seleccionado un par correcto
    if (newSelection.length === 2) {
      const block = content[index] as ContentBlock & { type: "matching" };
      const firstIndex = Math.floor(newSelection[0] / 2);
      const secondIndex = Math.floor(newSelection[1] / 2);
      
      // Si los índices corresponden al mismo par
      if (firstIndex === secondIndex) {
        // Correcta - avanzar automáticamente si todos los pares se han resuelto
      }
    }
  };
  
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-foreground/70">{description}</p>
          </div>
          <div className="bg-secondary rounded-full h-2 w-24">
            <div 
              className="bg-primary h-full rounded-full" 
              style={{ width: `${((currentBlockIndex + 1) / content.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <motion.div
          key={currentBlockIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {currentBlock.type === "text" && (
            <div className="prose prose-lg max-w-none">
              <p>{currentBlock.content}</p>
            </div>
          )}
          
          {currentBlock.type === "example" && (
            <div className="bg-secondary/50 p-6 rounded-lg border border-border">
              <p className="text-lg font-medium mb-2">{currentBlock.content}</p>
              {currentBlock.translation && (
                <p className="text-foreground/70 italic">{currentBlock.translation}</p>
              )}
            </div>
          )}
          
          {currentBlock.type === "exercise" && (
            <div>
              <h3 className="text-xl font-medium mb-4">{currentBlock.question}</h3>
              <div className="space-y-3">
                {currentBlock.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !hasAnsweredCurrent && handleAnswer(option)}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      selectedAnswers[currentBlockIndex] === option
                        ? option === currentBlock.correctAnswer
                          ? "border-green-500 bg-green-500/10"
                          : "border-red-500 bg-red-500/10"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    } ${hasAnsweredCurrent ? "cursor-default" : "cursor-pointer"}`}
                    disabled={hasAnsweredCurrent}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                        selectedAnswers[currentBlockIndex] === option
                          ? option === currentBlock.correctAnswer
                            ? "border-green-500"
                            : "border-red-500"
                          : "border-foreground/30"
                      }`}>
                        {selectedAnswers[currentBlockIndex] === option && (
                          option === currentBlock.correctAnswer ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
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
              
              {showCorrectAnswer[currentBlockIndex] && selectedAnswers[currentBlockIndex] !== currentBlock.correctAnswer && (
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="font-medium">La respuesta correcta es: <span className="text-primary">{currentBlock.correctAnswer}</span></p>
                </div>
              )}
            </div>
          )}
          
          {currentBlock.type === "audio" && (
            <div className="bg-secondary/50 p-6 rounded-lg border border-border">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium">{currentBlock.content}</p>
                <button 
                  onClick={() => toggleAudio(currentBlockIndex)}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                >
                  {isAudioPlaying[currentBlockIndex] ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex items-center p-3 bg-background/50 rounded-lg">
                <Mic className="w-5 h-5 text-primary mr-3" />
                <span className="text-sm">Intenta repetir el audio para practicar tu pronunciación</span>
              </div>
            </div>
          )}
          
          {currentBlock.type === "matching" && (
            <div>
              <h3 className="text-xl font-medium mb-4">Une cada palabra con su significado</h3>
              <div className="grid grid-cols-2 gap-4">
                {currentBlock.pairs.flatMap((pair, pairIndex) => [
                  <button
                    key={`spanish-${pairIndex}`}
                    onClick={() => handleMatchingSelection(currentBlockIndex, pairIndex * 2)}
                    className={`p-4 text-center rounded-lg border transition-all ${
                      (selectedAnswers[currentBlockIndex] as number[] || []).includes(pairIndex * 2)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {pair.spanish}
                  </button>,
                  <button
                    key={`meaning-${pairIndex}`}
                    onClick={() => handleMatchingSelection(currentBlockIndex, pairIndex * 2 + 1)}
                    className={`p-4 text-center rounded-lg border transition-all ${
                      (selectedAnswers[currentBlockIndex] as number[] || []).includes(pairIndex * 2 + 1)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {pair.meaning}
                  </button>
                ])}
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-foreground/70">
            <BookOpen className="w-5 h-5 mr-2" />
            <span>{currentBlockIndex + 1} de {content.length}</span>
          </div>
          
          <div className="flex space-x-3">
            {hasAnsweredCurrent || currentBlock.type === "text" || currentBlock.type === "example" || currentBlock.type === "audio" ? (
              <Button onClick={handleNext}>
                {isLastBlock ? "Completar lección" : "Continuar"}
              </Button>
            ) : (
              <Button variant="outline" disabled>
                {isLastBlock ? "Completar lección" : "Continuar"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;
