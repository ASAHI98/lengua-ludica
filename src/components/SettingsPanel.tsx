
import { useState, useEffect } from "react";
import { 
  Sun, 
  Moon, 
  Monitor, 
  Type, 
  Plus, 
  Minus, 
  Contrast
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";

const SettingsPanel = ({ onClose }: { onClose: () => void }) => {
  const { theme, setTheme } = useTheme();
  const { fontSize: contextFontSize, setFontSize: setContextFontSize, 
          contrastMode, setContrastMode } = useAccessibility();
  
  const [localFontSize, setLocalFontSize] = useState<number>(100);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  
  useEffect(() => {
    // Load saved font size setting
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      setLocalFontSize(Number(savedFontSize));
      document.documentElement.style.fontSize = `${Number(savedFontSize)}%`;
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
    toast.success(`Tema cambiado a ${newTheme === "system" ? "sistema" : newTheme === "dark" ? "oscuro" : "claro"}`);
  };
  
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setLocalFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem("fontSize", String(newSize));
    
    // Also update the accessibility context
    if (newSize <= 100) setContextFontSize("normal");
    else if (newSize <= 125) setContextFontSize("large");
    else setContextFontSize("extra-large");
  };
  
  const handleContrastChange = (checked: boolean) => {
    if (checked) {
      document.documentElement.classList.add("high-contrast");
      setContrastMode("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
      setContrastMode("normal");
    }
    localStorage.setItem("highContrast", String(checked));
    
    toast.success(`Alto contraste ${checked ? "activado" : "desactivado"}`);
  };
  
  const resetSettings = () => {
    // Reset theme
    localStorage.removeItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(systemTheme);
    
    // Reset font size
    setLocalFontSize(100);
    document.documentElement.style.fontSize = "100%";
    localStorage.setItem("fontSize", "100");
    setContextFontSize("normal");
    
    // Reset contrast
    document.documentElement.classList.remove("high-contrast");
    localStorage.setItem("highContrast", "false");
    setContrastMode("normal");
    
    toast.success("Ajustes restablecidos a valores predeterminados");
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
                  <Label htmlFor="font-size">Tamaño del texto: {localFontSize}%</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleFontSizeChange([Math.max(70, localFontSize - 10)])}>
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleFontSizeChange([Math.min(150, localFontSize + 10)])}>
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <Slider
                id="font-size"
                min={70}
                max={150}
                step={5}
                value={[localFontSize]}
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
                checked={contrastMode === "high-contrast"}
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
