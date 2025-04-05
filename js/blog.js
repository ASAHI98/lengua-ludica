
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
    // The rest of the posts are already rendered in HTML
  ];
  
  // Pagination functionality
  const paginationNumbers = document.querySelectorAll('.pagination-number');
  const prevBtn = document.querySelector('.pagination-prev');
  const nextBtn = document.querySelector('.pagination-next');
  
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
      const nextPage = document.querySelector(`.pagination-number:nth-child(${currentPage + 1})`);
      currentActive.classList.remove('active');
      nextPage.classList.add('active');
      
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
      const prevPage = document.querySelector(`.pagination-number:nth-child(${currentPage - 1})`);
      currentActive.classList.remove('active');
      prevPage.classList.add('active');
      
      nextBtn.disabled = false;
      prevBtn.disabled = currentPage - 1 === 1;
      
      // Show notification
      if (window.showNotification) {
        window.showNotification(`Página ${currentPage - 1} cargada`);
      }
    }
  });
  
  // Read more buttons functionality
  const readMoreButtons = document.querySelectorAll('.blog-card .btn-text');
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const postTitle = this.closest('.blog-card').querySelector('.blog-title').textContent;
      
      // In a real app, this would navigate to the full blog post
      console.log(`Navigate to full post: ${postTitle}`);
      
      // Show notification
      if (window.showNotification) {
        window.showNotification(`Abriendo artículo: ${postTitle}`);
      }
    });
  });
  
  // Common notification function (if not already defined)
  if (!window.showNotification) {
    window.showNotification = function(message) {
      const notification = document.getElementById('notification');
      const notificationMessage = document.getElementById('notification-message');
      
      notificationMessage.textContent = message;
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    };
  }
});
