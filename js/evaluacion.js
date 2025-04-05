
document.addEventListener('DOMContentLoaded', initializeAssessment);

// DOM Elements
const assessmentIntro = document.getElementById('assessment-intro');
const assessmentQuestions = document.getElementById('assessment-questions');
const assessmentResult = document.getElementById('assessment-result');
const startButton = document.getElementById('start-assessment');
const prevButton = document.getElementById('prev-question');
const nextButton = document.getElementById('next-question');
const questionContainer = document.getElementById('question-container');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const progressBar = document.getElementById('question-progress');
const restartButton = document.getElementById('restart-assessment');

// Assessment state
let currentQuestion = 1;
let answers = {};
const totalQuestions = 20; // In a real app, this would be dynamic

// Questions data (in a real app, this would come from a server)
const questionsData = [
  {
    id: 1,
    question: "Complete la frase: \"Buenos días, ¿cómo _______?\"",
    options: [
      { value: "a", text: "está" },
      { value: "b", text: "estás" },
      { value: "c", text: "están" },
      { value: "d", text: "estamos" }
    ],
    answer: "b"
  },
  {
    id: 2,
    question: "¿Cuál es el plural de 'lápiz'?",
    options: [
      { value: "a", text: "lápiz" },
      { value: "b", text: "lápizes" },
      { value: "c", text: "lápices" },
      { value: "d", text: "lápiss" }
    ],
    answer: "c"
  },
  {
    id: 3,
    question: "¿Cuál es el opuesto de 'grande'?",
    options: [
      { value: "a", text: "alto" },
      { value: "b", text: "pequeño" },
      { value: "c", text: "gordo" },
      { value: "d", text: "fuerte" }
    ],
    answer: "b"
  }
  // In a real app, there would be 20 questions
];

// Initialize assessment
function initializeAssessment() {
  // Set up total questions count
  if (totalQuestionsEl) totalQuestionsEl.textContent = totalQuestions;
  
  // Load saved progress if exists
  loadProgress();
  
  // Add event listeners
  if (startButton) {
    startButton.addEventListener('click', startAssessment);
  }
  
  if (prevButton) {
    prevButton.addEventListener('click', previousQuestion);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextQuestion);
  }
  
  if (restartButton) {
    restartButton.addEventListener('click', restartAssessment);
  }
  
  // Set up option click handlers
  setupOptionHandlers();
}

// Start assessment
function startAssessment() {
  assessmentIntro.classList.remove('active');
  assessmentQuestions.classList.add('active');
  
  // Generate questions or load current question
  loadQuestion(currentQuestion);
}

// Load question
function loadQuestion(questionNumber) {
  // Update progress indicators
  currentQuestionEl.textContent = questionNumber;
  const progressPercentage = ((questionNumber - 1) / totalQuestions) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  
  // Enable/disable navigation buttons
  prevButton.disabled = questionNumber === 1;
  nextButton.textContent = questionNumber === totalQuestions ? "Finalizar" : "Siguiente";
  
  // In a real app, we would load the appropriate question
  // For demo, we'll just use the questions we have
  const questionData = questionsData[questionNumber - 1];
  if (!questionData) return;
  
  // Clear previous content
  questionContainer.innerHTML = '';
  
  // Create question element
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.dataset.question = questionNumber;
  
  questionElement.innerHTML = `
    <h3>${questionData.id}. ${questionData.question}</h3>
    <div class="options">
      ${questionData.options.map(option => `
        <label class="option ${answers[questionNumber] === option.value ? 'selected' : ''}">
          <input type="radio" name="q${questionNumber}" value="${option.value}" ${answers[questionNumber] === option.value ? 'checked' : ''}>
          <span>${option.text}</span>
        </label>
      `).join('')}
    </div>
  `;
  
  questionContainer.appendChild(questionElement);
  
  // Re-attach event handlers
  setupOptionHandlers();
}

// Setup option click handlers
function setupOptionHandlers() {
  const options = document.querySelectorAll('.option');
  
  options.forEach(option => {
    option.addEventListener('click', function() {
      const radioButton = this.querySelector('input[type="radio"]');
      const questionNumber = parseInt(this.closest('.question').dataset.question);
      
      // Clear previous selections
      const questionOptions = document.querySelectorAll(`.question[data-question="${questionNumber}"] .option`);
      questionOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Select this option
      this.classList.add('selected');
      radioButton.checked = true;
      
      // Save answer
      answers[questionNumber] = radioButton.value;
      saveProgress();
    });
  });
}

// Previous question
function previousQuestion() {
  if (currentQuestion > 1) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
}

// Next question
function nextQuestion() {
  // Save current answer if selected
  const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
  if (selectedOption) {
    answers[currentQuestion] = selectedOption.value;
    saveProgress();
  }
  
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    finishAssessment();
  }
}

// Finish assessment
function finishAssessment() {
  // In a real app, we would send answers to the server for evaluation
  // For demo purposes, we'll calculate a simple score
  
  let correctAnswers = 0;
  let totalAnswered = 0;
  
  for (const questionId in answers) {
    totalAnswered++;
    const questionData = questionsData.find(q => q.id === parseInt(questionId));
    if (questionData && answers[questionId] === questionData.answer) {
      correctAnswers++;
    }
  }
  
  // Calculate level based on score (simplified for demo)
  let level, levelName;
  const score = totalAnswered > 0 ? (correctAnswers / questionsData.length) * 100 : 0;
  
  if (score >= 80) {
    level = "B2";
    levelName = "Intermedio Alto";
  } else if (score >= 60) {
    level = "B1";
    levelName = "Intermedio";
  } else if (score >= 40) {
    level = "A2";
    levelName = "Elemental";
  } else {
    level = "A1";
    levelName = "Principiante";
  }
  
  // Update result screen
  document.getElementById('result-level-badge').textContent = level;
  document.getElementById('result-level-name').textContent = levelName;
  
  // Update result description (would be dynamic in a real app)
  const resultDescription = document.querySelector('.result-description');
  resultDescription.innerHTML = `
    <p>Basado en los resultados de tu evaluación, tu nivel actual de español es <strong>${levelName} (${level})</strong>.</p>
    <p>${getDescriptionForLevel(level)}</p>
  `;
  
  // Update stats (would be calculated in a real app)
  document.querySelectorAll('.stat-value')[0].style.width = '65%';
  document.querySelectorAll('.stat-percent')[0].textContent = '65%';
  document.querySelectorAll('.stat-value')[1].style.width = '70%';
  document.querySelectorAll('.stat-percent')[1].textContent = '70%';
  document.querySelectorAll('.stat-value')[2].style.width = '80%';
  document.querySelectorAll('.stat-percent')[2].textContent = '80%';
  
  // Show result screen
  assessmentQuestions.classList.remove('active');
  assessmentResult.classList.add('active');
  
  // Save result
  localStorage.setItem('assessment_result', JSON.stringify({
    level,
    levelName,
    score,
    date: new Date().toISOString()
  }));
  
  // Clear saved progress
  localStorage.removeItem('assessment_answers');
  localStorage.removeItem('assessment_current');
}

// Restart assessment
function restartAssessment() {
  // Clear answers
  answers = {};
  currentQuestion = 1;
  
  // Clear localStorage
  localStorage.removeItem('assessment_answers');
  localStorage.removeItem('assessment_current');
  
  // Go back to intro screen
  assessmentResult.classList.remove('active');
  assessmentIntro.classList.add('active');
}

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem('assessment_answers', JSON.stringify(answers));
  localStorage.setItem('assessment_current', currentQuestion);
}

// Load progress from localStorage
function loadProgress() {
  const savedAnswers = localStorage.getItem('assessment_answers');
  const savedCurrentQuestion = localStorage.getItem('assessment_current');
  
  if (savedAnswers) {
    answers = JSON.parse(savedAnswers);
  }
  
  if (savedCurrentQuestion) {
    currentQuestion = parseInt(savedCurrentQuestion);
  }
}

// Helper function for level descriptions
function getDescriptionForLevel(level) {
  switch (level) {
    case "A1":
      return "Puedes entender y usar expresiones básicas. Puedes presentarte y hacer preguntas simples.";
    case "A2":
      return "Puedes comunicarte en tareas simples y rutinarias que requieren un intercambio simple de información.";
    case "B1":
      return "Esto significa que puedes comunicarte en situaciones cotidianas, comprender textos sencillos y expresar experiencias y deseos.";
    case "B2":
      return "Puedes entender las ideas principales de textos complejos y relacionarte con hablantes nativos con un grado suficiente de fluidez.";
    case "C1":
      return "Puedes expresarte con fluidez y espontaneidad, utilizando el lenguaje con flexibilidad y eficacia para fines sociales y profesionales.";
    case "C2":
      return "Puedes comprender con facilidad prácticamente todo lo que oyes o lees. Puedes expresarte de manera fluida y precisa.";
    default:
      return "Puedes entender y usar expresiones básicas.";
  }
}
