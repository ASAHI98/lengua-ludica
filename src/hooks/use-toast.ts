
import { createContext, useContext, useState } from "react";

type ToastProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
};

type ToastContextProps = {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  dismissToast: (index: number) => void;
};

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
  dismissToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: ToastProps) => {
    const newToast = { ...toast, duration: toast.duration || 5000 };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss
    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        dismissToast(toasts.length);
      }, newToast.duration);
    }
  };

  const dismissToast = (index: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Standalone toast function for use outside of React components
export const toast = {
  default: (props: Omit<ToastProps, "variant">) => {
    document.dispatchEvent(
      new CustomEvent("toast", { detail: { ...props, variant: "default" } })
    );
  },
  success: (props: Omit<ToastProps, "variant">) => {
    document.dispatchEvent(
      new CustomEvent("toast", { detail: { ...props, variant: "success" } })
    );
  },
  error: (props: Omit<ToastProps, "variant">) => {
    document.dispatchEvent(
      new CustomEvent("toast", { detail: { ...props, variant: "error" } })
    );
  },
  warning: (props: Omit<ToastProps, "variant">) => {
    document.dispatchEvent(
      new CustomEvent("toast", { detail: { ...props, variant: "warning" } })
    );
  },
  info: (props: Omit<ToastProps, "variant">) => {
    document.dispatchEvent(
      new CustomEvent("toast", { detail: { ...props, variant: "info" } })
    );
  },
};
