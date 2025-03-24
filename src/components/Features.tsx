
import { BookOpen, Award, MessageCircle, Zap, Layers, User } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Lecciones estructuradas",
    description: "Contenido organizado progresivamente para un aprendizaje óptimo, desde conceptos básicos hasta avanzados."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Certificaciones",
    description: "Obtén certificados digitales que validan tu nivel de competencia en español."
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Práctica conversacional",
    description: "Ejercicios interactivos que simulan conversaciones reales para mejorar tu fluidez."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Aprendizaje gamificado",
    description: "Sistema de puntos, insignias y niveles que hacen el proceso de aprendizaje más motivador."
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Contenido adaptativo",
    description: "Experiencias personalizadas según tu nivel y objetivos de aprendizaje."
  },
  {
    icon: <User className="h-6 w-6" />,
    title: "Tutor virtual",
    description: "Asistente inteligente que te guía, corrige y motiva durante todo tu aprendizaje."
  }
];

const Features = () => {
  return (
    <section id="metodologia" className="section-padding bg-secondary/30">
      <div className="max-container">
        <div className="text-center mb-16 animate-slide-up">
          <div className="tag mb-4 mx-auto inline-flex">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Nuestra metodología
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Una experiencia de aprendizaje diseñada para ti
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Combinamos tecnología de vanguardia con métodos pedagógicos probados para ofrecerte la forma más eficiente de dominar el español.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-8 hover:translate-y-[-5px] animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
