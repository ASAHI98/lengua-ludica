
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Lecciones", path: "/lecciones" },
    { name: "Metodología", path: "/#metodologia" },
  ];

  const handleEvaluacionClick = () => {
    navigate("/evaluacion-inicial");
  };

  const handlePerfilClick = () => {
    navigate("/perfil");
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-container flex items-center justify-between px-6 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-serif font-bold bg-gradient-to-r from-spanish-red to-primary bg-clip-text text-transparent">
            Lengua Lúdica
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${
                location.pathname === link.path ? "nav-link-active" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="py-2 px-4"
            onClick={handleEvaluacionClick}
          >
            Test de nivel
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={handlePerfilClick}
          >
            <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground focus:outline-none"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border animate-slide-up">
          <div className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-lg ${
                  location.pathname === link.path ? "text-primary font-medium" : "text-foreground/80"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <Button 
                variant="outline" 
                className="w-full text-center"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleEvaluacionClick();
                }}
              >
                Test de nivel
              </Button>
              <Button 
                className="w-full text-center"
                onClick={() => {
                  setIsMenuOpen(false);
                  handlePerfilClick();
                }}
              >
                Mi perfil
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
