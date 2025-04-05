
// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Blog posts data - in a real application, this would come from a server
  const blogPosts = [
    {
      id: "1",
      title: "Cómo dominar los verbos irregulares en español",
      summary: "Aprende las estrategias más efectivas para memorizar y utilizar correctamente los verbos irregulares en español.",
      date: "15 de junio de 2023",
      author: "María Rodríguez",
      category: "Gramática",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "2",
      title: "Los falsos amigos entre inglés y español",
      summary: "Descubre las palabras que parecen similares entre inglés y español pero tienen significados completamente diferentes.",
      date: "3 de mayo de 2023",
      author: "Carlos Martínez",
      category: "Vocabulario",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1555431189-0fabf2667795?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "3",
      title: "El subjuntivo español: cuándo y cómo utilizarlo",
      summary: "Una guía completa sobre el modo subjuntivo, uno de los aspectos más complicados de la gramática española.",
      date: "22 de abril de 2023",
      author: "Ana López",
      category: "Gramática",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "4",
      title: "Expresiones idiomáticas españolas y su origen",
      summary: "Conoce el significado y la historia detrás de algunas de las expresiones idiomáticas más populares en español.",
      date: "10 de marzo de 2023",
      author: "Javier Sánchez",
      category: "Cultura",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "5",
      title: "Técnicas de memorización para aprender vocabulario",
      summary: "Estrategias prácticas para ampliar tu vocabulario en español de manera efectiva y duradera.",
      date: "18 de febrero de 2023",
      author: "Laura Fernández",
      category: "Vocabulario",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: "6",
      title: "La pronunciación española: consejos para hablantes de inglés",
      summary: "Guía práctica para mejorar tu acento español si tu lengua materna es el inglés.",
      date: "5 de enero de 2023",
      author: "Diego Morales",
      category: "Pronunciación",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&auto=format&fit=crop&q=60"
    }
  ];
  
  // DOM elements
  const blogGrid = document.querySelector('.blog-grid');
  const paginationNumbers = document.querySelectorAll('.pagination-number');
  const prevBtn = document.querySelector('.pagination-prev');
  const nextBtn = document.querySelector('.pagination-next');
  
  // Initialize blog
  function initBlog() {
    renderBlogPosts();
    setupPagination();
  }
  
  // Render blog posts
  function renderBlogPosts() {
    if (!blogGrid) return;
    
    // Clear grid
    blogGrid.innerHTML = '';
    
    // Create blog post cards
    blogPosts.forEach(post => {
      const postCard = document.createElement('article');
      postCard.className = 'blog-card';
      
      postCard.innerHTML = `
        <div class="blog-card-header">
          <div class="blog-meta">
            <span class="blog-category">${post.category}</span>
            <span class="blog-read-time"><i class="fas fa-book"></i> ${post.readTime}</span>
          </div>
          <h2 class="blog-title">${post.title}</h2>
          <div class="blog-date">
            <i class="fas fa-calendar-days"></i>
            <span>${post.date}</span>
          </div>
        </div>
        <div class="blog-content">
          <p>${post.summary}</p>
        </div>
        <div class="blog-footer">
          <div class="blog-author">
            <i class="fas fa-user"></i>
            <span>${post.author}</span>
          </div>
          <button class="btn btn-text" data-post-id="${post.id}">Leer más</button>
        </div>
      `;
      
      blogGrid.appendChild(postCard);
    });
    
    // Add event listeners to read more buttons
    setupReadMoreButtons();
  }
  
  // Setup read more buttons
  function setupReadMoreButtons() {
    const readMoreButtons = document.querySelectorAll('.blog-card .btn-text');
    
    readMoreButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const postId = this.dataset.postId;
        const post = blogPosts.find(p => p.id === postId);
        
        // In a real app, this would navigate to the full blog post
        console.log(`Navigate to full post: ${post.title}`);
        
        // Show notification
        if (window.showNotification) {
          window.showNotification(`Abriendo artículo: ${post.title}`);
        }
      });
    });
  }
  
  // Setup pagination
  function setupPagination() {
    if (!paginationNumbers || !prevBtn || !nextBtn) return;
    
    paginationNumbers.forEach(btn => {
      btn.addEventListener('click', function() {
        // In a real app, this would load the appropriate page
        document.querySelectorAll('.pagination-number').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update prev/next button states
        const currentPage = parseInt(this.textContent);
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === paginationNumbers.length;
        
        // Show notification
        if (window.showNotification) {
          window.showNotification(`Página ${currentPage} cargada`);
        }
      });
    });
    
    nextBtn.addEventListener('click', function() {
      const currentActive = document.querySelector('.pagination-number.active');
      const currentPage = parseInt(currentActive.textContent);
      
      if (currentPage < paginationNumbers.length) {
        currentActive.classList.remove('active');
        document.querySelector(`.pagination-number:nth-child(${currentPage + 1})`).classList.add('active');
        
        prevBtn.disabled = false;
        nextBtn.disabled = currentPage + 1 === paginationNumbers.length;
        
        // Show notification
        if (window.showNotification) {
          window.showNotification(`Página ${currentPage + 1} cargada`);
        }
      }
    });
    
    prevBtn.addEventListener('click', function() {
      const currentActive = document.querySelector('.pagination-number.active');
      const currentPage = parseInt(currentActive.textContent);
      
      if (currentPage > 1) {
        currentActive.classList.remove('active');
        document.querySelector(`.pagination-number:nth-child(${currentPage - 1})`).classList.add('active');
        
        nextBtn.disabled = false;
        prevBtn.disabled = currentPage - 1 === 1;
        
        // Show notification
        if (window.showNotification) {
          window.showNotification(`Página ${currentPage - 1} cargada`);
        }
      }
    });
  }
  
  // Common notification function (if not already defined)
  if (!window.showNotification) {
    window.showNotification = function(message) {
      const notification = document.getElementById('notification');
      const notificationMessage = document.getElementById('notification-message');
      
      if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
          notification.classList.remove('show');
        }, 3000);
      }
    };
  }
  
  // Initialize the blog functionality
  initBlog();
});
