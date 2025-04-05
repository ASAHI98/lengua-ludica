
document.addEventListener('DOMContentLoaded', function() {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: 'Los 10 verbos más comunes en español',
      excerpt: 'Aprende los verbos más utilizados en las conversaciones cotidianas y cómo conjugarlos correctamente.',
      category: 'Gramática',
      date: '2025-03-25',
      author: 'María Rodríguez',
      authorImage: 'placeholder.svg',
      image: 'placeholder.svg'
    },
    {
      id: 2,
      title: 'Errores comunes de los anglohablantes',
      excerpt: 'Descubre los errores más frecuentes que cometen los hablantes de inglés cuando aprenden español.',
      category: 'Consejos',
      date: '2025-03-18',
      author: 'Carlos Gutiérrez',
      authorImage: 'placeholder.svg',
      image: 'placeholder.svg'
    },
    {
      id: 3,
      title: 'Expresiones coloquiales de España',
      excerpt: 'Conoce las frases y expresiones más utilizadas por los españoles en su día a día.',
      category: 'Vocabulario',
      date: '2025-03-10',
      author: 'Laura Méndez',
      authorImage: 'placeholder.svg',
      image: 'placeholder.svg'
    },
    {
      id: 4,
      title: 'Diferencias entre español latinoamericano y peninsular',
      excerpt: 'Analiza las principales diferencias léxicas y gramaticales entre el español de América Latina y España.',
      category: 'Cultura',
      date: '2025-03-01',
      author: 'Javier Ortiz',
      authorImage: 'placeholder.svg',
      image: 'placeholder.svg'
    },
    {
      id: 5,
      title: 'Técnicas de memorización para aprender vocabulario',
      excerpt: 'Métodos efectivos para recordar palabras nuevas y ampliar tu léxico en español.',
      category: 'Consejos',
      date: '2025-02-22',
      author: 'Ana Sánchez',
      authorImage: 'placeholder.svg',
      image: 'placeholder.svg'
    },
    {
      id: 6,
      title: 'El subjuntivo: Cuándo y cómo utilizarlo',
      excerpt: 'Guía práctica para entender y usar correctamente uno de los tiempos verbales más difíciles del español.',
      category: 'Gramática',
      date: '2025-02-15',
      author: 'Roberto Fernández',
      authorImage: 'placeholder.svg',
      image: 'placeholder.svg'
    }
  ];
  
  // Load blog posts
  const blogContainer = document.getElementById('blog-posts-container');
  
  if (blogContainer) {
    blogPosts.forEach(post => {
      const postElement = createBlogPostElement(post);
      blogContainer.appendChild(postElement);
    });
  }
});

function createBlogPostElement(post) {
  const article = document.createElement('article');
  article.className = 'blog-card';
  
  // Format the date nicely
  const postDate = new Date(post.date);
  const formattedDate = postDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  article.innerHTML = `
    <img src="${post.image}" alt="${post.title}" class="blog-image">
    <div class="blog-content">
      <div class="blog-meta">
        <span class="blog-category">${post.category}</span>
        <span class="blog-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${formattedDate}
        </span>
      </div>
      <h2 class="blog-title">${post.title}</h2>
      <p class="blog-excerpt">${post.excerpt}</p>
      <div class="blog-author">
        <div class="author-avatar">
          <img src="${post.authorImage}" alt="${post.author}">
        </div>
        <span class="author-name">${post.author}</span>
      </div>
    </div>
  `;
  
  // Make the article clickable
  article.style.cursor = 'pointer';
  article.addEventListener('click', () => {
    // In a real app, this would navigate to the post detail page
    console.log(`Clicked post: ${post.id}`);
  });
  
  return article;
}
