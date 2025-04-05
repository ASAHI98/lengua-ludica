
import { useState } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";

const AccessibilitySettings = () => {
  const { fontSize, setFontSize, contrastMode, setContrastMode, resetSettings } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Accessibility Settings">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <h3 className="text-lg font-medium mb-4">Accessibility Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Text Size</label>
            <div className="flex gap-2">
              <Button 
                variant={fontSize === "normal" ? "default" : "outline"}
                className="flex-1" 
                onClick={() => setFontSize("normal")}
              >
                Normal
              </Button>
              <Button 
                variant={fontSize === "large" ? "default" : "outline"}
                className="flex-1" 
                onClick={() => setFontSize("large")}
              >
                Large
              </Button>
              <Button 
                variant={fontSize === "extra-large" ? "default" : "outline"}
                className="flex-1" 
                onClick={() => setFontSize("extra-large")}
              >
                Extra Large
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-2">Contrast</label>
            <div className="flex gap-2">
              <Button 
                variant={contrastMode === "normal" ? "default" : "outline"}
                className="flex-1" 
                onClick={() => setContrastMode("normal")}
              >
                Normal
              </Button>
              <Button 
                variant={contrastMode === "high-contrast" ? "default" : "outline"}
                className="flex-1" 
                onClick={() => setContrastMode("high-contrast")}
              >
                High Contrast
              </Button>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={resetSettings}
          >
            Reset to Default
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilitySettings;
