
import React, { createContext, useContext, useEffect, useState } from "react";

type FontSize = "normal" | "large" | "extra-large";
type ContrastMode = "normal" | "high-contrast";

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    if (typeof window !== 'undefined') {
      // Check for percentage-based font size first (from SettingsPanel)
      const percentSize = localStorage.getItem("fontSize");
      if (percentSize) {
        const size = parseInt(percentSize);
        if (size <= 100) return "normal";
        else if (size <= 125) return "large";
        else return "extra-large";
      }
      
      // If not, check for direct font size setting
      return (localStorage.getItem("fontSizeMode") as FontSize) || "normal";
    }
    return "normal";
  });

  const [contrastMode, setContrastMode] = useState<ContrastMode>(() => {
    if (typeof window !== 'undefined') {
      // Check for boolean high contrast (from SettingsPanel)
      const highContrast = localStorage.getItem("highContrast");
      if (highContrast === "true") {
        return "high-contrast";
      }
      
      // If not, check for direct contrast setting
      return (localStorage.getItem("contrastMode") as ContrastMode) || "normal";
    }
    return "normal";
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("fontSizeMode", fontSize);
      
      // Apply font size to document
      const root = document.documentElement;
      root.classList.remove("text-normal", "text-large", "text-extra-large");
      root.classList.add(`text-${fontSize}`);
      
      // Also update percentage-based font size if not already set by SettingsPanel
      if (!localStorage.getItem("fontSize")) {
        let percentSize = "100";
        if (fontSize === "large") percentSize = "125";
        else if (fontSize === "extra-large") percentSize = "150";
        
        localStorage.setItem("fontSize", percentSize);
        root.style.fontSize = `${percentSize}%`;
      }
    }
  }, [fontSize]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("contrastMode", contrastMode);
      localStorage.setItem("highContrast", contrastMode === "high-contrast" ? "true" : "false");
      
      // Apply contrast mode to document
      const root = document.documentElement;
      root.classList.remove("high-contrast");
      if (contrastMode === "high-contrast") {
        root.classList.add("high-contrast");
      }
    }
  }, [contrastMode]);
  
  const resetSettings = () => {
    setFontSize("normal");
    setContrastMode("normal");
    if (typeof window !== 'undefined') {
      localStorage.setItem("fontSizeMode", "normal");
      localStorage.setItem("fontSize", "100");
      localStorage.setItem("contrastMode", "normal");
      localStorage.setItem("highContrast", "false");
      
      const root = document.documentElement;
      root.style.fontSize = "100%";
      root.classList.remove("high-contrast");
    }
  };

  return (
    <AccessibilityContext.Provider value={{ 
      fontSize, 
      setFontSize, 
      contrastMode, 
      setContrastMode, 
      resetSettings 
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
