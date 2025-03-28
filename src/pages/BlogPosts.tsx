
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, CalendarDays, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Cómo dominar los verbos irregulares en español",
    summary: "Aprende las estrategias más efectivas para memorizar y utilizar correctamente los verbos irregulares en español.",
    date: "15 de junio de 2023",
    author: "María Rodríguez",
    tags: ["Gramática", "Verbos", "Nivel Intermedio"],
    readTime: "5 min"
  },
  {
    id: "2",
    title: "Los falsos amigos entre inglés y español",
    summary: "Descubre las palabras que parecen similares entre inglés y español pero tienen significados completamente diferentes.",
    date: "3 de mayo de 2023",
    author: "Carlos Martínez",
    tags: ["Vocabulario", "Inglés-Español", "Nivel Principiante"],
    readTime: "8 min"
  },
  {
    id: "3",
    title: "El subjuntivo español: cuándo y cómo utilizarlo",
    summary: "Una guía completa sobre el modo subjuntivo, uno de los aspectos más complicados de la gramática española.",
    date: "22 de abril de 2023",
    author: "Ana López",
    tags: ["Gramática", "Subjuntivo", "Nivel Avanzado"],
    readTime: "10 min"
  },
  {
    id: "4",
    title: "Expresiones idiomáticas españolas y su origen",
    summary: "Conoce el significado y la historia detrás de algunas de las expresiones idiomáticas más populares en español.",
    date: "10 de marzo de 2023",
    author: "Javier Sánchez",
    tags: ["Cultura", "Expresiones", "Nivel Intermedio"],
    readTime: "7 min"
  },
  {
    id: "5",
    title: "Técnicas de memorización para aprender vocabulario",
    summary: "Estrategias prácticas para ampliar tu vocabulario en español de manera efectiva y duradera.",
    date: "18 de febrero de 2023",
    author: "Laura Fernández",
    tags: ["Vocabulario", "Técnicas de Estudio", "Todos los niveles"],
    readTime: "6 min"
  },
  {
    id: "6",
    title: "La pronunciación española: consejos para hablantes de inglés",
    summary: "Guía práctica para mejorar tu acento español si tu lengua materna es el inglés.",
    date: "5 de enero de 2023",
    author: "Diego Morales",
    tags: ["Pronunciación", "Fonética", "Nivel Principiante"],
    readTime: "9 min"
  }
];

const BlogPosts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-6">
        <div className="max-container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog de Español</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Artículos, consejos y recursos para mejorar tu español
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="glass-card overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="mb-2">
                      {post.tags[0]}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Book className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <CalendarDays className="h-3.5 w-3.5 mr-1" />
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{post.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-3.5 w-3.5 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <Button variant="ghost" size="sm">Leer más</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPosts;
