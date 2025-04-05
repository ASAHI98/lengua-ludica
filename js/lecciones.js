
// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Lecciones (lessons) page functionality
  
  // Lessons data - in a real application, this would come from a server
  const lessonsData = [
    {
      id: 1,
      title: "Introducción al Español",
      description: "Aprende las bases del idioma español con esta lección introductoria.",
      image: "https://images.unsplash.com/photo-1581781870027-c6b5d2c3c936?w=500&auto=format&fit=crop&q=60",
      level: "a1",
      category: "grammar",
      duration: 30,
      exercises: 12
    },
    {
      id: 2,
      title: "Saludos y Presentaciones",
      description: "Aprende a presentarte y saludar a otras personas en español.",
      image: "https://images.unsplash.com/photo-1537153729322-973151638331?w=500&auto=format&fit=crop&q=60",
      level: "a1",
      category: "conversation",
      duration: 45,
      exercises: 15
    },
    {
      id: 3,
      title: "Verbos Regulares en Presente",
      description: "Domina los verbos regulares en presente indicativo.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60",
      level: "a1",
      category: "grammar",
      duration: 60,
      exercises: 20
    },
    {
      id: 4,
      title: "Vocabulario Básico: La Casa",
      description: "Aprende el vocabulario relacionado con la casa y los objetos cotidianos.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60",
      level: "a1",
      category: "vocabulary",
      duration: 30,
      exercises: 10
    },
    {
      id: 5,
      title: "Tradiciones Españolas",
      description: "Descubre las tradiciones más importantes de España.",
      image: "https://images.unsplash.com/photo-1559144716-25074fb600c9?w=500&auto=format&fit=crop&q=60",
      level: "b1",
      category: "culture",
      duration: 45,
      exercises: 5
    },
    {
      id: 6,
      title: "El Pretérito Indefinido",
      description: "Aprende a usar el tiempo pasado en español para hablar de acciones terminadas.",
      image: "https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?w=500&auto=format&fit=crop&q=60",
      level: "a2",
      category: "grammar",
      duration: 60,
      exercises: 18
    }
  ];
  
  // DOM Elements
  const lessonsGrid = document.getElementById('lessons-grid');
  const filterButtons = document.querySelectorAll('.filter-option');
  
  // Filter state
  let filters = {
    level: 'all',
    category: 'all'
  };
  
  // Initialize page
  function initPage() {
    renderLessons();
    setupFilterEvents();
  }
  
  // Render lessons
  function renderLessons() {
    if (!lessonsGrid) return;
    
    // Clear grid
    lessonsGrid.innerHTML = '';
    
    // Filter lessons
    let filteredLessons = lessonsData;
    
    if (filters.level !== 'all') {
      filteredLessons = filteredLessons.filter(lesson => lesson.level === filters.level);
    }
    
    if (filters.category !== 'all') {
      filteredLessons = filteredLessons.filter(lesson => lesson.category === filters.category);
    }
    
    // Check if no results found
    if (filteredLessons.length === 0) {
      lessonsGrid.innerHTML = `
        <div class="no-lessons">
          <p>No se encontraron lecciones que coincidan con los filtros seleccionados.</p>
          <button id="reset-filters" class="btn btn-outline">Reiniciar filtros</button>
        </div>
      `;
      
      const resetButton = document.getElementById('reset-filters');
      if (resetButton) {
        resetButton.addEventListener('click', () => {
          filters = {
            level: 'all',
            category: 'all'
          };
          
          // Reset active filter buttons
          filterButtons.forEach(button => {
            if (button.dataset.value === 'all') {
              button.classList.add('active');
            } else {
              button.classList.remove('active');
            }
          });
          
          renderLessons();
        });
      }
      
      return;
    }
    
    // Create lesson cards
    filteredLessons.forEach(lesson => {
      const lessonCard = document.createElement('div');
      lessonCard.className = 'lesson-card';
      
      lessonCard.innerHTML = `
        <img src="${lesson.image}" alt="${lesson.title}" class="lesson-image">
        <div class="lesson-content">
          <div class="lesson-meta">
            <span class="lesson-level level-${lesson.level}">${getLevelText(lesson.level)}</span>
            <span class="lesson-category ${lesson.category}">${getCategoryText(lesson.category)}</span>
          </div>
          <h3 class="lesson-title">${lesson.title}</h3>
          <p class="lesson-description">${lesson.description}</p>
          <div class="lesson-details">
            <span class="lesson-detail">
              <i class="fas fa-clock"></i>
              ${lesson.duration} minutos
            </span>
            <span class="lesson-detail">
              <i class="fas fa-tasks"></i>
              ${lesson.exercises} ejercicios
            </span>
          </div>
          <div class="lesson-actions">
            <a href="leccion.html?id=${lesson.id}" class="btn btn-primary">Iniciar lección</a>
          </div>
        </div>
      `;
      
      lessonsGrid.appendChild(lessonCard);
    });
  }
  
  // Setup filter events
  function setupFilterEvents() {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterType = button.dataset.filter;
        const filterValue = button.dataset.value;
        
        // Update filter state
        filters[filterType] = filterValue;
        
        // Update active state
        document.querySelectorAll(`.filter-option[data-filter="${filterType}"]`).forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Re-render lessons
        renderLessons();
        
        // Show notification
        if (window.showNotification) {
          window.showNotification(`Filtro aplicado: ${getFilterText(filterType, filterValue)}`);
        } else if (window.toast) {
          window.toast.info(`Filtro aplicado: ${getFilterText(filterType, filterValue)}`);
        }
      });
    });
  }
  
  // Helper functions
  function getLevelText(level) {
    switch(level) {
      case 'a1': return 'A1 - Principiante';
      case 'a2': return 'A2 - Elemental';
      case 'b1': return 'B1 - Intermedio';
      case 'b2': return 'B2 - Intermedio Alto';
      case 'c1': return 'C1 - Avanzado';
      case 'c2': return 'C2 - Maestría';
      default: return level.toUpperCase();
    }
  }
  
  function getCategoryText(category) {
    switch(category) {
      case 'grammar': return 'Gramática';
      case 'vocabulary': return 'Vocabulario';
      case 'conversation': return 'Conversación';
      case 'culture': return 'Cultura';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }
  
  function getFilterText(type, value) {
    if (value === 'all') {
      return `Todos los ${type === 'level' ? 'niveles' : 'categorías'}`;
    }
    
    if (type === 'level') {
      return getLevelText(value);
    } else if (type === 'category') {
      return getCategoryText(value);
    }
    
    return value;
  }
  
  // Initialize the page
  initPage();
});
