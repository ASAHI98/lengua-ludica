
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SettingsPanel = ({ onClose }: { onClose: () => void }) => {
  const { theme, setTheme } = useTheme();
  
  const resetProgress = () => {
    localStorage.setItem("userPoints", "0");
    localStorage.setItem("lessonsCompleted", "0");
    localStorage.setItem("daysStreak", "1");
    localStorage.setItem("minutesLearned", "0");
    
    toast.success("Progreso reiniciado correctamente");
    onClose();
    // Recargar la página para actualizar los datos
    setTimeout(() => window.location.reload(), 1000);
  };
  
  return (
    <div className="glass-card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">Ajustes</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-4">Tema</h3>
          <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value as "light" | "dark")}>
            <ToggleGroupItem value="light" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <span>Claro</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <span>Oscuro</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Notificaciones</Label>
            <p className="text-sm text-muted-foreground">Recibe recordatorios para estudiar</p>
          </div>
          <Switch id="notifications" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sound">Sonidos</Label>
            <p className="text-sm text-muted-foreground">Efectos de sonido en ejercicios</p>
          </div>
          <Switch id="sound" defaultChecked />
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-md font-medium text-destructive mb-2">Zona de peligro</h3>
          <Button 
            variant="destructive"
            className="w-full"
            onClick={resetProgress}
          >
            Reiniciar progreso
          </Button>
        </div>
        
        <Button onClick={onClose} className="w-full">
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
