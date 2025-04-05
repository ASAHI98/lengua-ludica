
// Lessons data (in a real app, this would come from a server)
const lessonsData = [
  {
    id: 1,
    title: "Introducción al Español",
    description: "Aprende las bases del idioma español con esta lección introductoria.",
    image: "https://images.unsplash.com/photo-1581781870027-c6b5d2c3c936",
    level: "a1",
    category: "grammar",
    duration: 30,
    exercises: 12,
    progress: 0
  },
  {
    id: 2,
    title: "Saludos y Presentaciones",
    description: "Aprende a presentarte y saludar a otras personas en español.",
    image: "https://images.unsplash.com/photo-1537153729322-973151638331",
    level: "a1",
    category: "conversation",
    duration: 45,
    exercises: 15,
    progress: 0
  },
  {
    id: 3,
    title: "El Verbo Ser y Estar",
    description: "Domina los dos verbos más importantes del español.",
    image: "https://images.unsplash.com/photo-1536516982560-d6607de3f3ca",
    level: "a2",
    category: "grammar",
    duration: 60,
    exercises: 20,
    progress: 0
  },
  {
    id: 4,
    title: "Vocabulario de Comidas",
    description: "Aprende vocabulario relacionado con alimentos y restaurantes.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    level: "a1",
    category: "vocabulary",
    duration: 35,
    exercises: 18,
    progress: 0
  },
  {
    id: 5,
    title: "Tiempos de Pasado",
    description: "Aprende a utilizar el pretérito indefinido y el imperfecto.",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090",
    level: "b1",
    category: "grammar",
    duration: 75,
    exercises: 25,
    progress: 0
  },
  {
    id: 6,
    title: "Cultura Española",
    description: "Descubre aspectos culturales de España y su influencia global.",
    image: "https://images.unsplash.com/photo-1558642891-54be180ea339",
    level: "b1",
    category: "culture",
    duration: 50,
    exercises: 10,
    progress: 0
  },
  {
    id: 7,
    title: "El Subjuntivo",
    description: "Domina uno de los modos verbales más complejos del español.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    level: "c1",
    category: "grammar",
    duration: 90,
    exercises: 30,
    progress: 0
  },
  {
    id: 8,
    title: "Dialectos del Español",
    description: "Explora las diferentes variantes del español en el mundo.",
    image: "https://images.unsplash.com/photo-1535992165812-68d1861aa71e",
    level: "b2",
    category: "culture",
    duration: 60,
    exercises: 15,
    progress: 0
  },
  {
    id: 9,
    title: "Expresiones Idiomáticas",
    description: "Aprende expresiones populares utilizadas por nativos.",
    image: "https://images.unsplash.com/photo-1516383274235-5f42d6c6517d",
    level: "b2",
    category: "vocabulary",
    duration: 45,
    exercises: 20,
    progress: 0
  }
];

// DOM Elements
const lessonsContainer = document.getElementById('lessons-container');
const levelFilter = document.getElementById('level-filter');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-lessons');
const paginationNumbers = document.getElementById('pagination-numbers');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');

// Variables
let currentPage = 1;
const lessonsPerPage = 6;
let filteredLessons = [...lessonsData];

// Load saved progress from localStorage
function loadProgressFromStorage() {
  lessonsData.forEach(lesson => {
    const savedProgress = localStorage.getItem(`lesson_${lesson.id}_progress`);
    if (savedProgress !== null) {
      lesson.progress = parseInt(savedProgress, 10);
    }
  });
}

// Initialize lessons page
function initLessonsPage() {
  loadProgressFromStorage();
  renderLessons();
  
  // Event listeners
  if (levelFilter) {
    levelFilter.addEventListener('change', filterLessons);
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterLessons);
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(filterLessons, 300));
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderLessons();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderLessons();
      }
    });
  }
}

// Filter lessons based on criteria
function filterLessons() {
  const levelValue = levelFilter ? levelFilter.value : 'all';
  const categoryValue = categoryFilter ? categoryFilter.value : 'all';
  const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
  
  filteredLessons = lessonsData.filter(lesson => {
    // Level filter
    const levelMatch = levelValue === 'all' || lesson.level === levelValue;
    
    // Category filter
    const categoryMatch = categoryValue === 'all' || lesson.category === categoryValue;
    
    // Search filter
    const searchMatch = lesson.title.toLowerCase().includes(searchValue) || 
                       lesson.description.toLowerCase().includes(searchValue);
    
    return levelMatch && categoryMatch && searchMatch;
  });
  
  // Reset to first page when filters change
  currentPage = 1;
  renderLessons();
}

// Render lessons
function renderLessons() {
  if (!lessonsContainer) return;
  
  // Clear container
  lessonsContainer.innerHTML = '';
  
  // Calculate pages
  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);
  const startIndex = (currentPage - 1) * lessonsPerPage;
  const endIndex = startIndex + lessonsPerPage;
  const currentLessons = filteredLessons.slice(startIndex, endIndex);
  
  // No results
  if (currentLessons.length === 0) {
    lessonsContainer.innerHTML = `
      <div class="no-results">
        <p>No se encontraron lecciones con los filtros seleccionados.</p>
      </div>
    `;
    return;
  }
  
  // Render lessons
  currentLessons.forEach(lesson => {
    const lessonCard = createLessonCard(lesson);
    lessonsContainer.appendChild(lessonCard);
  });
  
  // Update pagination
  updatePagination(totalPages);
  
  // Update buttons state
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Create a lesson card
function createLessonCard(lesson) {
  const card = document.createElement('a');
  card.href = `leccion.html?id=${lesson.id}`;
  card.className = 'lesson-card';
  
  // Get level text based on level code
  const levelText = getLevelText(lesson.level);
  
  // Get category text
  const categoryText = getCategoryText(lesson.category);
  
  card.innerHTML = `
    <img src="${lesson.image}" alt="${lesson.title}" class="lesson-image">
    <div class="lesson-content">
      <div>
        <span class="lesson-level level-${lesson.level}">${levelText}</span>
        <span class="category-badge category-${lesson.category}">${categoryText}</span>
      </div>
      <h3 class="lesson-title">${lesson.title}</h3>
      <p class="lesson-description">${lesson.description}</p>
      <div class="lesson-meta">
        <div class="lesson-stats">
          <span class="lesson-stat"><i class="fas fa-clock"></i> ${lesson.duration} min</span>
          <span class="lesson-stat"><i class="fas fa-tasks"></i> ${lesson.exercises} ejercicios</span>
        </div>
        ${lesson.progress > 0 ? `<span>${lesson.progress}% completado</span>` : ''}
      </div>
      ${lesson.progress > 0 ? `
        <div class="lesson-progress">
          <div class="progress-bar" style="width: ${lesson.progress}%"></div>
        </div>
      ` : ''}
    </div>
  `;
  
  return card;
}

// Update pagination
function updatePagination(totalPages) {
  if (!paginationNumbers) return;
  
  paginationNumbers.innerHTML = '';
  
  // Simple pagination for mobile
  if (window.innerWidth < 640) {
    paginationNumbers.innerHTML = `<span>Página ${currentPage} de ${totalPages}</span>`;
    return;
  }
  
  // Full pagination for larger screens
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust start page if end page is maxed out
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  // First page
  if (startPage > 1) {
    paginationNumbers.appendChild(createPageButton(1));
    if (startPage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'pagination-ellipsis';
      ellipsis.textContent = '...';
      paginationNumbers.appendChild(ellipsis);
    }
  }
  
  // Numbered pages
  for (let i = startPage; i <= endPage; i++) {
    paginationNumbers.appendChild(createPageButton(i));
  }
  
  // Last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'pagination-ellipsis';
      ellipsis.textContent = '...';
      paginationNumbers.appendChild(ellipsis);
    }
    paginationNumbers.appendChild(createPageButton(totalPages));
  }
}

// Create page button
function createPageButton(pageNumber) {
  const button = document.createElement('button');
  button.className = `page-number ${pageNumber === currentPage ? 'active' : ''}`;
  button.textContent = pageNumber;
  
  button.addEventListener('click', () => {
    currentPage = pageNumber;
    renderLessons();
  });
  
  return button;
}

// Helper Functions
function getLevelText(level) {
  switch (level) {
    case 'a1': return 'A1 - Principiante';
    case 'a2': return 'A2 - Elemental';
    case 'b1': return 'B1 - Intermedio';
    case 'b2': return 'B2 - Intermedio Alto';
    case 'c1': return 'C1 - Avanzado';
    case 'c2': return 'C2 - Maestría';
    default: return 'Nivel no especificado';
  }
}

function getCategoryText(category) {
  switch (category) {
    case 'grammar': return 'Gramática';
    case 'vocabulary': return 'Vocabulario';
    case 'conversation': return 'Conversación';
    case 'culture': return 'Cultura';
    default: return 'General';
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize page if it's the lessons page
if (document.getElementById('lessons-container')) {
  document.addEventListener('DOMContentLoaded', initLessonsPage);
}
