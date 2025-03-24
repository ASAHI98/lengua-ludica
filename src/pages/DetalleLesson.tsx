
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LessonContent, { ContentBlock } from "@/components/LessonContent";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

// Mock data for lessons
const lessonsMockData = {
  "gramatica-presente": {
    id: "gramatica-presente",
    title: "El Presente Simple",
    description: "Aprende a expresar acciones habituales y estados permanentes",
    level: "A1",
    category: "Gramática",
    points: 100,
    duration: "15 min",
    content: [
      {
        type: "text" as const,
        content: "El presente simple en español se utiliza para hablar de acciones habituales o estados permanentes. Es uno de los tiempos verbales más importantes y se utiliza frecuentemente en la conversación diaria."
      },
      {
        type: "example" as const,
        content: "Yo estudio español todos los días.",
        translation: "I study Spanish every day."
      },
      {
        type: "text" as const,
        content: "Para formar el presente simple, necesitamos conjugar el verbo según la persona gramatical. Vamos a ver cómo conjugar los verbos regulares terminados en -ar, -er, e -ir."
      },
      {
        type: "example" as const,
        content: "Hablar (to speak): yo hablo, tú hablas, él/ella habla, nosotros hablamos, vosotros habláis, ellos/ellas hablan",
      },
      {
        type: "example" as const,
        content: "Comer (to eat): yo como, tú comes, él/ella come, nosotros comemos, vosotros coméis, ellos/ellas comen",
      },
      {
        type: "example" as const,
        content: "Vivir (to live): yo vivo, tú vives, él/ella vive, nosotros vivimos, vosotros vivís, ellos/ellas viven",
      },
      {
        type: "exercise" as const,
        question: "Completa la oración: 'Nosotros ________ (comer) en un restaurante los domingos.'",
        options: ["comemos", "comes", "comen", "comeis"],
        correctAnswer: "comemos"
      },
      {
        type: "exercise" as const,
        question: "¿Cuál es la forma correcta para 'ellos' del verbo 'hablar'?",
        options: ["habla", "hablas", "hablan", "hablamos"],
        correctAnswer: "hablan"
      },
      {
        type: "text" as const,
        content: "También hay verbos irregulares en español que no siguen este patrón regular. Algunos de los más comunes son: ser, estar, ir, tener, hacer, etc."
      },
      {
        type: "exercise" as const,
        question: "¿Cómo se dice 'I am a student' en español?",
        options: ["Yo estoy estudiante", "Yo soy estudiante", "Yo tengo estudiante", "Yo hay estudiante"],
        correctAnswer: "Yo soy estudiante"
      },
      {
        type: "matching" as const,
        pairs: [
          { spanish: "Yo hablo", meaning: "I speak" },
          { spanish: "Tú comes", meaning: "You eat" },
          { spanish: "Ella vive", meaning: "She lives" },
          { spanish: "Nosotros somos", meaning: "We are" }
        ]
      }
    ]
  },
  "vocabulario-saludos": {
    id: "vocabulario-saludos",
    title: "Saludos y Presentaciones",
    description: "Aprende a saludar y presentarte en español",
    level: "A1",
    category: "Vocabulario",
    points: 80,
    duration: "10 min",
    content: [
      {
        type: "text" as const,
        content: "Los saludos son fundamentales para iniciar cualquier conversación en español. Vamos a aprender algunos saludos básicos y cómo presentarnos."
      },
      {
        type: "audio" as const,
        content: "¡Hola! ¿Cómo estás?",
        audioUrl: "/audio/hola-como-estas.mp3"
      },
      {
        type: "example" as const,
        content: "¡Buenos días! Me llamo Ana.",
        translation: "Good morning! My name is Ana."
      },
      {
        type: "example" as const,
        content: "¡Buenas tardes! Mucho gusto.",
        translation: "Good afternoon! Nice to meet you."
      },
      {
        type: "example" as const,
        content: "¡Buenas noches! ¿Cómo te llamas?",
        translation: "Good evening! What's your name?"
      },
      {
        type: "exercise" as const,
        question: "¿Qué significa 'Mucho gusto'?",
        options: ["Good morning", "How are you?", "Nice to meet you", "See you later"],
        correctAnswer: "Nice to meet you"
      },
      {
        type: "audio" as const,
        content: "Me llamo Carlos. Soy de España. ¿Y tú?",
        audioUrl: "/audio/me-llamo-carlos.mp3"
      },
      {
        type: "exercise" as const,
        question: "¿Cómo se pregunta el nombre de alguien de manera formal?",
        options: [
          "¿Cómo te llamas?", 
          "¿Cómo se llama usted?", 
          "¿Cuál es su nombre?", 
          "Las opciones B y C son correctas"
        ],
        correctAnswer: "Las opciones B y C son correctas"
      },
      {
        type: "matching" as const,
        pairs: [
          { spanish: "Hola", meaning: "Hello" },
          { spanish: "Adiós", meaning: "Goodbye" },
          { spanish: "Buenos días", meaning: "Good morning" },
          { spanish: "Hasta luego", meaning: "See you later" }
        ]
      }
    ]
  }
};

const DetalleLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simular carga de la lección desde una API
    setIsLoading(true);
    setTimeout(() => {
      if (lessonId && lessonsMockData[lessonId as keyof typeof lessonsMockData]) {
        setLesson(lessonsMockData[lessonId as keyof typeof lessonsMockData]);
      }
      setIsLoading(false);
    }, 500);
  }, [lessonId]);
  
  const handleGoBack = () => {
    navigate("/lecciones");
  };
  
  const handleLessonComplete = () => {
    // Actualizar progreso del usuario
    toast.success("¡Lección completada!", {
      description: `Has ganado ${lesson?.points || 0} puntos.`,
      duration: 5000
    });
    
    // Redirigir a lecciones después de un breve retraso
    setTimeout(() => {
      navigate("/lecciones");
    }, 2000);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse w-12 h-12 rounded-full bg-primary/20"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold mb-4">Lección no encontrada</h1>
          <p className="text-foreground/70 mb-6">Lo sentimos, la lección que buscas no existe o ha sido eliminada.</p>
          <Button onClick={handleGoBack}>Volver a lecciones</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 pl-0 flex items-center" 
            onClick={handleGoBack}
          >
            <ChevronLeft className="mr-2" />
            Volver a lecciones
          </Button>
          
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Nivel {lesson.level}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                {lesson.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                {lesson.duration}
              </span>
            </div>
          </div>
          
          <LessonContent 
            title={lesson.title}
            description={lesson.description}
            content={lesson.content}
            onComplete={handleLessonComplete}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetalleLesson;
