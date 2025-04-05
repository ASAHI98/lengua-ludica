
// Get lesson ID from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('id');

// DOM Elements
const lessonTitleBreadcrumb = document.getElementById('lesson-title-breadcrumb');
const lessonTitle = document.getElementById('lesson-title');
const lessonDescription = document.getElementById('lesson-description');
const lessonLevel = document.getElementById('lesson-level');
const lessonCategory = document.getElementById('lesson-category');
const lessonDuration = document.getElementById('lesson-duration');
const lessonExercises = document.getElementById('lesson-exercises');
const lessonImage = document.getElementById('lesson-image');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');
const moduleList = document.getElementById('module-list');
const moduleContent = document.getElementById('module-content');
const prevModuleBtn = document.getElementById('prev-module');
const nextModuleBtn = document.getElementById('next-module');

// Progress variables
let currentModuleIndex = 0;
let completedModules = [];
let lessonData = null;

// Lesson data (in a real app, this would come from a server)
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
    modules: [
      {
        id: "m1-1",
        title: "Bienvenida",
        type: "theory",
        duration: 5,
        content: `
          <div class="module-theory">
            <h2>Bienvenido a tu primera lección de español</h2>
            <p>El español es uno de los idiomas más hablados del mundo, con más de 460 millones de hablantes nativos. Es el idioma oficial en 21 países y una de las seis lenguas oficiales de las Naciones Unidas.</p>
            <p>En esta lección, aprenderás:</p>
            <ul>
              <li>El alfabeto español y su pronunciación</li>
              <li>Saludos básicos</li>
              <li>Presentarte a ti mismo</li>
            </ul>
            <p>Estás dando el primer paso en un viaje emocionante para dominar uno de los idiomas más hermosos y expresivos del mundo. ¡Vamos!</p>
          </div>
        `
      },
      {
        id: "m1-2",
        title: "El alfabeto español",
        type: "theory",
        duration: 10,
        content: `
          <div class="module-theory">
            <h2>El alfabeto español</h2>
            <p>El alfabeto español consiste en 27 letras:</p>
            <p>a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z</p>
            <p>A diferencia del inglés, el español incluye la letra "ñ", que se pronuncia como "ny" en la palabra "canyon".</p>
            
            <div class="example-box">
              <h4>Ejemplos de pronunciación:</h4>
              <div class="example-item">
                <span class="example-spanish">Niño</span>
                <span class="example-translation">Niño (child)</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Mañana</span>
                <span class="example-translation">Mañana (tomorrow)</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Español</span>
                <span class="example-translation">Español (Spanish)</span>
              </div>
            </div>
            
            <p>El español también utiliza acentos (á, é, í, ó, ú) para indicar dónde se pone el énfasis en una palabra.</p>
            
            <div class="audio-player">
              <div class="audio-controls">
                <button class="audio-play">
                  <i class="fas fa-play"></i>
                </button>
                <div class="audio-info">
                  <div class="audio-title">Pronunciación del alfabeto</div>
                  <div class="audio-progress">
                    <div class="audio-progress-bar" style="width: 0%"></div>
                  </div>
                  <div class="audio-time">
                    <span>0:00</span>
                    <span>2:30</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p>Recuerda practicar la pronunciación regularmente. El español es un idioma fonético, lo que significa que generalmente se pronuncia como se escribe.</p>
          </div>
        `
      },
      {
        id: "m1-3",
        title: "Saludos básicos",
        type: "theory",
        duration: 8,
        content: `
          <div class="module-theory">
            <h2>Saludos básicos en español</h2>
            <p>Los saludos son esenciales para iniciar cualquier conversación. Aquí están algunos saludos comunes en español:</p>
            
            <div class="example-box">
              <h4>Saludos formales:</h4>
              <div class="example-item">
                <span class="example-spanish">Buenos días</span>
                <span class="example-translation">Good morning</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Buenas tardes</span>
                <span class="example-translation">Good afternoon</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Buenas noches</span>
                <span class="example-translation">Good evening/night</span>
              </div>
            </div>
            
            <div class="example-box">
              <h4>Saludos informales:</h4>
              <div class="example-item">
                <span class="example-spanish">Hola</span>
                <span class="example-translation">Hello/Hi</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">¿Qué tal?</span>
                <span class="example-translation">How are you?/What's up?</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">¿Cómo estás?</span>
                <span class="example-translation">How are you?</span>
              </div>
            </div>
            
            <p>Es importante notar que en español, usamos diferentes saludos según la hora del día:</p>
            <ul>
              <li><strong>Buenos días</strong>: desde la mañana hasta el mediodía</li>
              <li><strong>Buenas tardes</strong>: desde el mediodía hasta el anochecer</li>
              <li><strong>Buenas noches</strong>: durante la noche</li>
            </ul>
            
            <p>Para responder a un saludo, puedes usar estas expresiones:</p>
            
            <div class="example-box">
              <div class="example-item">
                <span class="example-spanish">Bien, gracias. ¿Y tú?</span>
                <span class="example-translation">Fine, thank you. And you?</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Muy bien, ¿y usted?</span>
                <span class="example-translation">Very well, and you? (formal)</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Todo bien</span>
                <span class="example-translation">All good</span>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "m1-4",
        title: "Ejercicio: Saludos",
        type: "exercise",
        duration: 7,
        content: `
          <div class="exercise">
            <h2 class="exercise-title">Ejercicio: Saludos</h2>
            <p class="exercise-instructions">Selecciona el saludo correcto para cada situación.</p>
            
            <div class="exercise-item">
              <p>1. Son las 9:00 de la mañana y te encuentras con tu profesor.</p>
              <div class="exercise-options">
                <label class="exercise-option">
                  <input type="radio" name="q1" value="a">
                  Buenas noches
                </label>
                <label class="exercise-option">
                  <input type="radio" name="q1" value="b">
                  Buenos días
                </label>
                <label class="exercise-option">
                  <input type="radio" name="q1" value="c">
                  Buenas tardes
                </label>
              </div>
            </div>
            
            <div class="exercise-item">
              <p>2. Son las 7:00 de la tarde y te encuentras con un amigo.</p>
              <div class="exercise-options">
                <label class="exercise-option">
                  <input type="radio" name="q2" value="a">
                  Buenos días
                </label>
                <label class="exercise-option">
                  <input type="radio" name="q2" value="b">
                  Buenas tardes
                </label>
                <label class="exercise-option">
                  <input type="radio" name="q2" value="c">
                  ¿Cómo te llamas?
                </label>
              </div>
            </div>
            
            <div class="exercise-item">
              <p>3. Alguien te dice "¿Cómo estás?". ¿Qué respondes?</p>
              <div class="exercise-options">
                <label class="exercise-option">
                  <input type="radio" name="q3" value="a">
                  Me llamo Juan
                </label>
                <label class="exercise-option">
                  <input type="radio" name="q3" value="b">
                  Bien, gracias. ¿Y tú?
                </label>
                <label class="exercise-option">
                  <input type="radio" name="q3" value="c">
                  Buenos días
                </label>
              </div>
            </div>
            
            <button id="check-answers" class="btn btn-primary">Comprobar respuestas</button>
            
            <div id="exercise-feedback" class="feedback hidden">
              <!-- Feedback will be added by JavaScript -->
            </div>
          </div>
        `
      },
      {
        id: "m1-5",
        title: "Presentaciones",
        type: "theory",
        duration: 10,
        content: `
          <div class="module-theory">
            <h2>Presentaciones en español</h2>
            <p>Después de saludar, es común presentarte. Aquí tienes algunas frases útiles:</p>
            
            <div class="example-box">
              <h4>Decir tu nombre:</h4>
              <div class="example-item">
                <span class="example-spanish">Me llamo [nombre].</span>
                <span class="example-translation">My name is [name].</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Soy [nombre].</span>
                <span class="example-translation">I am [name].</span>
              </div>
            </div>
            
            <div class="example-box">
              <h4>Preguntar el nombre:</h4>
              <div class="example-item">
                <span class="example-spanish">¿Cómo te llamas?</span>
                <span class="example-translation">What's your name? (informal)</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">¿Cómo se llama usted?</span>
                <span class="example-translation">What's your name? (formal)</span>
              </div>
            </div>
            
            <p>También puedes añadir información sobre tu origen o profesión:</p>
            
            <div class="example-box">
              <h4>Origen:</h4>
              <div class="example-item">
                <span class="example-spanish">Soy de [país/ciudad].</span>
                <span class="example-translation">I'm from [country/city].</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Vengo de [país/ciudad].</span>
                <span class="example-translation">I come from [country/city].</span>
              </div>
            </div>
            
            <div class="example-box">
              <h4>Profesión:</h4>
              <div class="example-item">
                <span class="example-spanish">Soy [profesión].</span>
                <span class="example-translation">I am a [profession].</span>
              </div>
              <div class="example-item">
                <span class="example-spanish">Trabajo como [profesión].</span>
                <span class="example-translation">I work as a [profession].</span>
              </div>
            </div>
            
            <p>En una conversación típica, podrías decir:</p>
            <p class="example-dialog">
              - Hola, ¿cómo estás?<br>
              - Bien, gracias. ¿Y tú?<br>
              - Muy bien. Me llamo Carlos. ¿Cómo te llamas?<br>
              - Me llamo Ana. Soy de México.<br>
              - ¡Mucho gusto, Ana!<br>
              - Igualmente, Carlos.
            </p>
          </div>
        `
      }
    ]
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
    modules: [
      {
        id: "m2-1",
        title: "Introducción",
        type: "theory",
        duration: 5,
        content: `<div class="module-theory"><h2>Introducción a Saludos y Presentaciones</h2><p>En esta lección aprenderás a saludar correctamente y a presentarte en situaciones formales e informales.</p></div>`
      }
      // More modules would be defined here
    ]
  }
];

// Initialize lesson
function initializeLessonPage() {
  if (!lessonId) {
    showError("No se especificó una lección");
    return;
  }
  
  // Get lesson data
  lessonData = lessonsData.find(lesson => lesson.id == lessonId);
  
  if (!lessonData) {
    showError("Lección no encontrada");
    return;
  }
  
  // Load saved progress
  loadProgress();
  
  // Update page with lesson data
  updateLessonInfo();
  
  // Create module list
  createModuleList();
  
  // Load first module
  loadModule(currentModuleIndex);
  
  // Add event listeners
  prevModuleBtn.addEventListener('click', previousModule);
  nextModuleBtn.addEventListener('click', nextModule);
  
  // Modal event listeners
  const completionModal = document.getElementById('completion-modal');
  const closeModal = document.getElementById('close-modal');
  const continueBtn = document.getElementById('continue-learning');
  
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      completionModal.classList.add('hidden');
    });
  }
  
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      completionModal.classList.add('hidden');
    });
  }
  
  // Close modal on outside click
  if (completionModal) {
    completionModal.addEventListener('click', event => {
      if (event.target === completionModal) {
        completionModal.classList.add('hidden');
      }
    });
  }
}

// Update lesson info
function updateLessonInfo() {
  if (!lessonData) return;
  
  lessonTitleBreadcrumb.textContent = lessonData.title;
  lessonTitle.textContent = lessonData.title;
  lessonDescription.textContent = lessonData.description;
  
  // Set level badge
  lessonLevel.textContent = getLevelText(lessonData.level);
  lessonLevel.className = `lesson-level level-${lessonData.level}`;
  
  // Set category badge
  lessonCategory.textContent = getCategoryText(lessonData.category);
  lessonCategory.className = `lesson-category ${lessonData.category}`;
  
  // Set metadata
  lessonDuration.textContent = `${lessonData.duration} min`;
  lessonExercises.textContent = `${lessonData.exercises} ejercicios`;
  
  // Set image
  lessonImage.src = lessonData.image;
  lessonImage.alt = lessonData.title;
  
  // Update progress
  updateProgressBar();
}

// Create module list
function createModuleList() {
  if (!moduleList || !lessonData) return;
  
  moduleList.innerHTML = '';
  
  lessonData.modules.forEach((module, index) => {
    const moduleItem = document.createElement('li');
    moduleItem.className = 'module-item';
    
    const isCompleted = completedModules.includes(module.id);
    const isActive = index === currentModuleIndex;
    
    moduleItem.innerHTML = `
      <div class="module-link ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
        <div class="module-icon">
          ${isCompleted ? '<i class="fas fa-check"></i>' : `${index + 1}`}
        </div>
        <div class="module-info">
          <div class="module-title">${module.title}</div>
          <div class="module-duration">${module.duration} min</div>
        </div>
        <div class="module-status">
          ${isCompleted ? '<i class="fas fa-check-circle"></i>' : ''}
        </div>
      </div>
    `;
    
    moduleItem.addEventListener('click', () => {
      loadModule(index);
    });
    
    moduleList.appendChild(moduleItem);
  });
}

// Load module content
function loadModule(index) {
  if (!lessonData || !moduleContent) return;
  
  if (index < 0 || index >= lessonData.modules.length) {
    return;
  }
  
  // Update current module index
  currentModuleIndex = index;
  
  // Update module list
  createModuleList();
  
  // Show loading state
  moduleContent.innerHTML = `
    <div class="module-loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Cargando contenido...</p>
    </div>
  `;
  
  // Simulate loading delay
  setTimeout(() => {
    // Load module content
    const module = lessonData.modules[index];
    moduleContent.innerHTML = module.content;
    
    // Add event listeners for interactions
    if (module.type === 'exercise') {
      const checkButton = document.getElementById('check-answers');
      
      if (checkButton) {
        checkButton.addEventListener('click', () => {
          checkExerciseAnswers(module);
        });
      }
    }
    
    // Initialize audio players
    initializeAudioPlayers();
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, 500);
}

// Initialize audio players
function initializeAudioPlayers() {
  const audioPlayers = document.querySelectorAll('.audio-play');
  
  audioPlayers.forEach(player => {
    player.addEventListener('click', () => {
      const icon = player.querySelector('i');
      const isPlaying = icon.classList.contains('fa-pause');
      
      if (isPlaying) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        
        // Simulate audio playing
        simulateAudioProgress(player);
      }
    });
  });
}

// Simulate audio progress
function simulateAudioProgress(player) {
  const progressBar = player.closest('.audio-player').querySelector('.audio-progress-bar');
  const timeDisplay = player.closest('.audio-player').querySelector('.audio-time').children[0];
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += 1;
    
    if (progress > 100) {
      clearInterval(interval);
      const icon = player.querySelector('i');
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
      return;
    }
    
    progressBar.style.width = `${progress}%`;
    
    // Update time display (assuming a 2:30 audio)
    const totalSeconds = Math.floor(150 * (progress / 100));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 150); // Update every 150ms
}

// Update navigation buttons
function updateNavigationButtons() {
  prevModuleBtn.disabled = currentModuleIndex === 0;
  nextModuleBtn.disabled = currentModuleIndex === lessonData.modules.length - 1;
}

// Previous module
function previousModule() {
  if (currentModuleIndex > 0) {
    loadModule(currentModuleIndex - 1);
  }
}

// Next module
function nextModule() {
  if (currentModuleIndex < lessonData.modules.length - 1) {
    // Check if current module is completed
    const currentModule = lessonData.modules[currentModuleIndex];
    
    if (!completedModules.includes(currentModule.id)) {
      markModuleAsCompleted(currentModule.id);
    }
    
    loadModule(currentModuleIndex + 1);
  }
}

// Check exercise answers
function checkExerciseAnswers(module) {
  // For demo purposes, we'll just show success feedback
  const feedbackElement = document.getElementById('exercise-feedback');
  
  if (!feedbackElement) return;
  
  feedbackElement.className = 'feedback correct';
  feedbackElement.innerHTML = `
    <div class="feedback-header">
      <div class="feedback-icon">
        <i class="fas fa-check"></i>
      </div>
      <div class="feedback-title">¡Correcto!</div>
    </div>
    <p>Has completado el ejercicio correctamente.</p>
  `;
  feedbackElement.classList.remove('hidden');
  
  // Mark module as completed
  markModuleAsCompleted(module.id);
  
  // Show completion modal
  setTimeout(() => {
    const completionModal = document.getElementById('completion-modal');
    if (completionModal) {
      completionModal.classList.remove('hidden');
    }
  }, 1000);
}

// Mark module as completed
function markModuleAsCompleted(moduleId) {
  if (!completedModules.includes(moduleId)) {
    completedModules.push(moduleId);
    
    // Update progress
    updateProgressBar();
    
    // Save progress to localStorage
    saveProgress();
  }
}

// Update progress bar
function updateProgressBar() {
  if (!lessonData) return;
  
  const totalModules = lessonData.modules.length;
  const completedCount = completedModules.length;
  const progressPercentage = Math.round((completedCount / totalModules) * 100);
  
  progressBar.style.width = `${progressPercentage}%`;
  progressPercent.textContent = `${progressPercentage}%`;
  
  // Save lesson progress
  localStorage.setItem(`lesson_${lessonId}_progress`, progressPercentage.toString());
}

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem(`lesson_${lessonId}_completed_modules`, JSON.stringify(completedModules));
}

// Load progress from localStorage
function loadProgress() {
  const savedModules = localStorage.getItem(`lesson_${lessonId}_completed_modules`);
  
  if (savedModules) {
    completedModules = JSON.parse(savedModules);
  }
}

// Show error message
function showError(message) {
  if (moduleContent) {
    moduleContent.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error</h3>
        <p>${message}</p>
        <a href="lecciones.html" class="btn btn-primary">Volver a lecciones</a>
      </div>
    `;
  }
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

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeLessonPage);
