
import React, { createContext, useContext, useEffect, useState } from "react";

type FontSize = "normal" | "large" | "extra-large";
type ContrastMode = "normal" | "high-contrast";

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem("fontSize") as FontSize) || "normal";
    }
    return "normal";
  });

  const [contrastMode, setContrastMode] = useState<ContrastMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem("contrastMode") as ContrastMode) || "normal";
    }
    return "normal";
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("fontSize", fontSize);
      
      // Apply font size to document
      const root = document.documentElement;
      root.classList.remove("text-normal", "text-large", "text-extra-large");
      root.classList.add(`text-${fontSize}`);
    }
  }, [fontSize]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("contrastMode", contrastMode);
      
      // Apply contrast mode to document
      const root = document.documentElement;
      root.classList.remove("high-contrast");
      if (contrastMode === "high-contrast") {
        root.classList.add("high-contrast");
      }
    }
  }, [contrastMode]);

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize, contrastMode, setContrastMode }}>
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
