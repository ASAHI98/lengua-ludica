
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Moon, 
  Sun, 
  Type, 
  ZoomIn, 
  Contrast, 
  Glasses
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AccessibilitySettings = () => {
  const { theme, setTheme } = useTheme();
  const { 
    fontSize, 
    setFontSize, 
    contrastMode, 
    setContrastMode 
  } = useAccessibility();

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <Glasses className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Configuración de accesibilidad</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Accesibilidad</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Accesibilidad</h4>
            <p className="text-sm text-muted-foreground">
              Ajusta la apariencia de la aplicación para mejorar tu experiencia.
            </p>
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <span>Tema</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                </span>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Contrast className="h-4 w-4" />
                <span>Contraste</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setContrastMode(
                  contrastMode === "normal" ? "high-contrast" : "normal"
                )}
              >
                <Contrast className="h-5 w-5" />
                <span className="sr-only">
                  {contrastMode === "normal" 
                    ? "Activar alto contraste" 
                    : "Desactivar alto contraste"}
                </span>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <span>Tamaño de texto</span>
              </div>
              <div className="flex space-x-1">
                <Button 
                  variant={fontSize === "normal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFontSize("normal")}
                >
                  A
                </Button>
                <Button 
                  variant={fontSize === "large" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFontSize("large")}
                >
                  <span className="text-lg">A</span>
                </Button>
                <Button 
                  variant={fontSize === "extra-large" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFontSize("extra-large")}
                >
                  <span className="text-xl">A</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilitySettings;
