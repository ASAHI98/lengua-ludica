
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LevelProgress from "@/components/LevelProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Calendar, Clock, Settings, User, Edit } from "lucide-react";
import ProfileEditor from "@/components/ProfileEditor";
import SettingsPanel from "@/components/SettingsPanel";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface UserStats {
  lessonsCompleted: number;
  daysStreak: number;
  minutesLearned: number;
  pointsEarned: number;
  badges: string[];
}

const Perfil = () => {
  const [userLevel, setUserLevel] = useState("A1");
  const [stats, setStats] = useState<UserStats>({
    lessonsCompleted: 0,
    daysStreak: 1,
    minutesLearned: 0,
    pointsEarned: 0,
    badges: ["Principiante"],
  });
  const [userName, setUserName] = useState("Estudiante");
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const savedLevel = localStorage.getItem("userLevel");
    if (savedLevel) {
      setUserLevel(savedLevel);
    }
    
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
    
    // Cargar estadísticas
    setStats({
      lessonsCompleted: parseInt(localStorage.getItem("lessonsCompleted") || "0"),
      daysStreak: parseInt(localStorage.getItem("daysStreak") || "1"),
      minutesLearned: parseInt(localStorage.getItem("minutesLearned") || "0"),
      pointsEarned: parseInt(localStorage.getItem("userPoints") || "0"),
      badges: JSON.parse(localStorage.getItem("userBadges") || '["Principiante"]'),
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="glass-card p-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>
                    <User className="w-12 h-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-2xl font-bold mb-1">{userName}</h1>
                <p className="text-foreground/70 mb-4">Nivel {userLevel}</p>
                
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="font-bold text-xl">{stats.lessonsCompleted}</div>
                    <div className="text-xs text-foreground/70">Lecciones</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">{stats.daysStreak}</div>
                    <div className="text-xs text-foreground/70">Días seguidos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">{stats.pointsEarned}</div>
                    <div className="text-xs text-foreground/70">Puntos</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-4 flex items-center gap-2"
                  onClick={() => setShowProfileEditor(true)}
                >
                  <Edit className="h-4 w-4" />
                  Editar perfil
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings className="h-4 w-4" />
                  Ajustes
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="progress">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="progress" className="flex-1">Progreso</TabsTrigger>
                  <TabsTrigger value="stats" className="flex-1">Estadísticas</TabsTrigger>
                  <TabsTrigger value="badges" className="flex-1">Insignias</TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress" className="mt-0">
                  <LevelProgress />
                </TabsContent>
                
                <TabsContent value="stats" className="mt-0">
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold mb-6">Tus estadísticas</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center p-4 border border-border rounded-lg bg-background/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-lg font-bold">{stats.lessonsCompleted}</div>
                          <div className="text-sm text-foreground/70">Lecciones completadas</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 border border-border rounded-lg bg-background/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-lg font-bold">{stats.daysStreak}</div>
                          <div className="text-sm text-foreground/70">Días consecutivos</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 border border-border rounded-lg bg-background/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-lg font-bold">{stats.minutesLearned}</div>
                          <div className="text-sm text-foreground/70">Minutos estudiados</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 border border-border rounded-lg bg-background/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-lg font-bold">{stats.pointsEarned}</div>
                          <div className="text-sm text-foreground/70">Puntos ganados</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="badges" className="mt-0">
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold mb-6">Tus insignias</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {stats.badges.map((badge, index) => (
                        <div key={index} className="flex flex-col items-center p-4 border border-border rounded-lg bg-background/50">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Award className="w-8 h-8 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-center">{badge}</span>
                        </div>
                      ))}
                      
                      {/* Insignias bloqueadas */}
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={`locked-${index}`} className="flex flex-col items-center p-4 border border-border rounded-lg bg-background/50 opacity-50">
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                            <Award className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <span className="text-sm font-medium text-center text-muted-foreground">Bloqueada</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Modal de edición de perfil */}
      <Dialog open={showProfileEditor} onOpenChange={setShowProfileEditor}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md mx-auto">
          <ProfileEditor onClose={() => setShowProfileEditor(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Modal de configuración */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md mx-auto">
          <SettingsPanel onClose={() => setShowSettings(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Perfil;
