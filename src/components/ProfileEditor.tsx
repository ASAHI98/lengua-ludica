
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ProfileFormData {
  name: string;
  email: string;
}

const ProfileEditor = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: localStorage.getItem("userName") || "Estudiante",
      email: localStorage.getItem("userEmail") || "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    setIsSubmitting(true);
    
    // Guardar datos en localStorage
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    
    // Simulación de petición a API
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("¡Perfil actualizado correctamente!");
      onClose();
    }, 500);
  };

  return (
    <div className="glass-card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">Editar Perfil</h2>
      
      <div className="mb-6 flex justify-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>
            <User className="w-12 h-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isSubmitting}
            >
              Guardar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileEditor;
