
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Book, Brain, GraduationCap, Medal, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Methodology = () => {
  const methodologies = [
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: "Aprendizaje Progresivo",
      description: "Nuestro enfoque se basa en niveles graduales (A1, A2, B1, B2, C1, C2) que te permiten avanzar a tu propio ritmo, construyendo una base sólida antes de progresar.",
      badges: ["Personalizado", "Estructurado"]
    },
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "Aprendizaje Activo",
      description: "Utilizamos técnicas de interacción, repetición espaciada y retroalimentación inmediata que han demostrado científicamente mejorar la retención y comprensión.",
      badges: ["Interactivo", "Científico"]
    },
    {
      icon: <Medal className="w-12 h-12 text-primary" />,
      title: "Gamificación",
      description: "Transformamos el aprendizaje en una experiencia motivadora mediante puntos, insignias y niveles que celebran tus logros y mantienen tu motivación.",
      badges: ["Motivador", "Divertido"]
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Objetivos Claros",
      description: "Cada lección tiene objetivos de aprendizaje específicos, permitiéndote ver claramente tu progreso y lo que necesitas para alcanzar fluidez.",
      badges: ["Medible", "Enfocado"]
    }
  ];

  const modules = [
    {
      icon: <Book className="w-10 h-10 text-primary" />,
      title: "Gramática",
      description: "Aprende la estructura del idioma español de forma intuitiva y práctica, con explicaciones claras y numerosos ejemplos."
    },
    {
      icon: <Book className="w-10 h-10 text-primary" />,
      title: "Vocabulario",
      description: "Amplía tu léxico con palabras y frases organizadas por temas, contextos y niveles de uso."
    },
    {
      icon: <Book className="w-10 h-10 text-primary" />,
      title: "Pronunciación",
      description: "Perfecciona tu acento y entonación con ejercicios específicos y comparaciones de audio."
    },
    {
      icon: <Book className="w-10 h-10 text-primary" />,
      title: "Ortografía",
      description: "Domina las reglas de escritura del español, incluyendo acentuación y puntuación."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="max-container">
          <section className="mb-16">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Metodología</h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Aprender español con nosotros es un viaje estructurado y personalizado hacia la fluidez y comprensión completa del idioma.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {methodologies.map((method, index) => (
                <Card key={index} className="glass-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="mb-3">{method.icon}</div>
                    <CardTitle>{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mt-2">
                      {method.badges.map((badge, i) => (
                        <Badge key={i} variant="secondary">{badge}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Nuestros Módulos</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Cada módulo está diseñado para desarrollar un aspecto específico de tu competencia lingüística.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {modules.map((module, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                  <p className="text-foreground/70">{module.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Methodology;
