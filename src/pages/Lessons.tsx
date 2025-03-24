
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, BookOpen, Clock, Filter, GraduationCap, 
  Search, BookA, BookText, Volume2, PenTool 
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  imageUrl?: string;
  isCompleted?: boolean;
  isNew?: boolean;
}

const categoriesIcons = {
  "Gramática": <BookText className="w-5 h-5" />,
  "Vocabulario": <BookA className="w-5 h-5" />,
  "Pronunciación": <Volume2 className="w-5 h-5" />,
  "Ortografía": <PenTool className="w-5 h-5" />,
};

const mockLessons: Lesson[] = [
  {
    id: "gramatica-presente",
    title: "El Presente Simple",
    description: "Aprende a expresar acciones habituales y estados permanentes",
    category: "Gramática",
    level: "A1",
    duration: "15 min",
    isNew: true
  },
  {
    id: "vocabulario-saludos",
    title: "Saludos y Presentaciones",
    description: "Aprende a saludar y presentarte en español",
    category: "Vocabulario",
    level: "A1",
    duration: "10 min",
    isCompleted: true
  },
  {
    id: "pronunciacion-vocales",
    title: "Las Vocales en Español",
    description: "Aprende a pronunciar correctamente las vocales españolas",
    category: "Pronunciación",
    level: "A1",
    duration: "8 min"
  },
  {
    id: "gramatica-ser-estar",
    title: "Ser vs Estar",
    description: "Aprende cuándo usar 'ser' y cuándo usar 'estar'",
    category: "Gramática",
    level: "A2",
    duration: "20 min"
  },
  {
    id: "vocabulario-comida",
    title: "Vocabulario de Alimentos",
    description: "Aprende palabras relacionadas con la comida y bebida",
    category: "Vocabulario",
    level: "A1",
    duration: "12 min"
  },
  {
    id: "ortografia-acentos",
    title: "Reglas de Acentuación",
    description: "Aprende cuándo y cómo usar los acentos en español",
    category: "Ortografía",
    level: "A2",
    duration: "18 min"
  },
  {
    id: "gramatica-preterito",
    title: "El Pretérito Indefinido",
    description: "Aprende a hablar de acciones completadas en el pasado",
    category: "Gramática",
    level: "A2",
    duration: "25 min"
  },
  {
    id: "pronunciacion-r",
    title: "La Pronunciación de la R",
    description: "Aprende a pronunciar correctamente la 'r' simple y la 'rr' multiple",
    category: "Pronunciación",
    level: "A2",
    duration: "10 min"
  }
];

const Lessons = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>(mockLessons);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [userLevel, setUserLevel] = useState("A1");
  
  useEffect(() => {
    const savedLevel = localStorage.getItem("userLevel");
    if (savedLevel) {
      setUserLevel(savedLevel);
    }
  }, []);
  
  useEffect(() => {
    // Filtrar lecciones basado en búsqueda y categoría
    let results = mockLessons;
    
    if (searchTerm) {
      results = results.filter(
        lesson => 
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeCategory) {
      results = results.filter(lesson => lesson.category === activeCategory);
    }
    
    setFilteredLessons(results);
  }, [searchTerm, activeCategory]);
  
  const handleLessonClick = (lessonId: string) => {
    navigate(`/leccion/${lessonId}`);
  };
  
  const handleTakeTest = () => {
    navigate("/evaluacion-inicial");
  };
  
  const categories = [...new Set(mockLessons.map(lesson => lesson.category))];
  const availableLevels = [...new Set(mockLessons.map(lesson => lesson.level))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="max-container">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Lecciones de Español</h1>
                <p className="text-foreground/70 mt-2">
                  Aprende español a tu ritmo con nuestras lecciones interactivas
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleTakeTest} variant="outline" className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Test de nivel</span>
                </Button>
                
                <Button className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Mi progreso</span>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar lecciones..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant={activeCategory ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setActiveCategory(null)}
                  title="Mostrar todas las categorías"
                >
                  <Filter className="w-4 h-4" />
                </Button>
                
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                    title={`Filtrar por ${category}`}
                  >
                    {categoriesIcons[category as keyof typeof categoriesIcons]}
                    <span className="ml-2 hidden md:inline">{category}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue={userLevel} className="w-full">
              <TabsList className="mb-6">
                {availableLevels.map(level => (
                  <TabsTrigger key={level} value={level}>
                    Nivel {level}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {availableLevels.map(level => (
                <TabsContent key={level} value={level} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons
                      .filter(lesson => lesson.level === level)
                      .map(lesson => (
                        <div
                          key={lesson.id}
                          className="glass-card overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                          onClick={() => handleLessonClick(lesson.id)}
                        >
                          <div className="h-36 bg-primary/10 relative">
                            {lesson.imageUrl ? (
                              <img 
                                src={lesson.imageUrl} 
                                alt={lesson.title} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                {categoriesIcons[lesson.category as keyof typeof categoriesIcons] || <BookOpen className="w-12 h-12 text-primary/40" />}
                              </div>
                            )}
                            
                            {lesson.isNew && (
                              <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                                NUEVO
                              </span>
                            )}
                            
                            {lesson.isCompleted && (
                              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                <div className="bg-green-500 text-white rounded-full p-2">
                                  <Award className="w-5 h-5" />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-5">
                            <div className="flex justify-between items-center mb-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                {lesson.category}
                              </span>
                              
                              <span className="flex items-center text-xs text-foreground/70">
                                <Clock className="w-3 h-3 mr-1" />
                                {lesson.duration}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-bold mb-1">{lesson.title}</h3>
                            <p className="text-sm text-foreground/70 line-clamp-2">{lesson.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  {filteredLessons.filter(lesson => lesson.level === level).length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-bold mb-2">No hay lecciones disponibles</h3>
                      <p className="text-foreground/70">No se encontraron lecciones para esta búsqueda o filtro.</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lessons;
