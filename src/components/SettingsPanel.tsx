
import { useState, useEffect } from "react";
import { 
  Sun, 
  Moon, 
  Monitor, 
  Type, 
  TypePlus, 
  TypeMinus, 
  Contrast
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const SettingsPanel = ({ onClose }: { onClose: () => void }) => {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState<number>(100);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  
  useEffect(() => {
    // Cargar configuraciones guardadas
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      setFontSize(Number(savedFontSize));
      document.documentElement.style.fontSize = `${Number(savedFontSize)}%`;
    }
    
    const savedContrast = localStorage.getItem("highContrast");
    if (savedContrast === "true") {
      setHighContrast(true);
      document.documentElement.classList.add("high-contrast");
    }
  }, []);
  
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
      localStorage.removeItem("theme"); // Remove to use system preference
    } else {
      setTheme(newTheme);
    }
  };
  
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem("fontSize", String(newSize));
  };
  
  const handleContrastChange = (checked: boolean) => {
    setHighContrast(checked);
    if (checked) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
    localStorage.setItem("highContrast", String(checked));
  };
  
  const resetSettings = () => {
    // Reset theme
    localStorage.removeItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(systemTheme);
    
    // Reset font size
    setFontSize(100);
    document.documentElement.style.fontSize = "100%";
    localStorage.removeItem("fontSize");
    
    // Reset contrast
    setHighContrast(false);
    document.documentElement.classList.remove("high-contrast");
    localStorage.removeItem("highContrast");
  };
  
  return (
    <div className="glass-card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">Ajustes</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Tema</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="flex flex-col items-center py-3 h-auto"
              onClick={() => handleThemeChange("light")}
            >
              <Sun className="h-5 w-5 mb-1" />
              <span className="text-xs">Claro</span>
            </Button>
            
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="flex flex-col items-center py-3 h-auto"
              onClick={() => handleThemeChange("dark")}
            >
              <Moon className="h-5 w-5 mb-1" />
              <span className="text-xs">Oscuro</span>
            </Button>
            
            <Button
              variant={!localStorage.getItem("theme") ? "default" : "outline"}
              className="flex flex-col items-center py-3 h-auto"
              onClick={() => handleThemeChange("system")}
            >
              <Monitor className="h-5 w-5 mb-1" />
              <span className="text-xs">Sistema</span>
            </Button>
          </div>
        </div>
        
        <Collapsible
          open={isAccessibilityOpen}
          onOpenChange={setIsAccessibilityOpen}
          className="border rounded-lg p-4"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0">
              <h3 className="text-lg font-medium">Accesibilidad</h3>
              <span>{isAccessibilityOpen ? "▲" : "▼"}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  <Label htmlFor="font-size">Tamaño del texto: {fontSize}%</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleFontSizeChange([Math.max(70, fontSize - 10)])}>
                    <TypeMinus className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleFontSizeChange([Math.min(150, fontSize + 10)])}>
                    <TypePlus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <Slider
                id="font-size"
                min={70}
                max={150}
                step={5}
                value={[fontSize]}
                onValueChange={handleFontSizeChange}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Contrast className="h-4 w-4 mr-2" />
                <Label htmlFor="contrast">Alto contraste</Label>
              </div>
              <Switch
                id="contrast"
                checked={highContrast}
                onCheckedChange={handleContrastChange}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={resetSettings}
          >
            Restablecer ajustes predeterminados
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <Button onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
