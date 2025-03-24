
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Plataforma",
      links: [
        { name: "Inicio", path: "/" },
        { name: "Lecciones", path: "/lecciones" },
        { name: "Recursos", path: "/recursos" },
        { name: "Blog", path: "/blog" },
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nosotros", path: "/sobre-nosotros" },
        { name: "Contacto", path: "/contacto" },
        { name: "Carreras", path: "/carreras" },
        { name: "Prensa", path: "/prensa" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Términos de Servicio", path: "/terminos" },
        { name: "Política de Privacidad", path: "/privacidad" },
        { name: "Cookies", path: "/cookies" },
      ]
    },
  ];
  
  const socialLinks = [
    { icon: <Facebook size={20} />, path: "#" },
    { icon: <Twitter size={20} />, path: "#" },
    { icon: <Instagram size={20} />, path: "#" },
    { icon: <Youtube size={20} />, path: "#" },
    { icon: <Mail size={20} />, path: "#" },
  ];

  return (
    <footer className="bg-secondary/30">
      <div className="max-container pt-16 pb-8 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-serif font-bold bg-gradient-to-r from-spanish-red to-primary bg-clip-text text-transparent">
                Lengua Lúdica
              </span>
            </Link>
            <p className="text-foreground/70 mb-6 max-w-md">
              Plataforma educativa dedicada a la enseñanza del español mediante metodologías inmersivas e interactivas, adaptadas a las necesidades del siglo XXI.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.path} 
                  className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={`Social link ${index + 1}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-bold text-lg mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            © {currentYear} Lengua Lúdica. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors duration-300">
              Idioma: Español
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors duration-300">
              Ayuda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
