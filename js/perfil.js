
document.addEventListener('DOMContentLoaded', initializeProfilePage);

// DOM Elements
const editProfileBtn = document.getElementById('edit-profile');
const profileModal = document.getElementById('profile-modal');
const closeProfileModal = document.getElementById('close-profile-modal');
const cancelProfileBtn = document.getElementById('cancel-profile');
const profileForm = document.getElementById('profile-form');
const profileNameInput = document.getElementById('profile-name');
const profileEmailInput = document.getElementById('profile-email');
const userName = document.getElementById('user-name');

const editSettingsBtn = document.getElementById('edit-settings');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsModal = document.getElementById('close-settings-modal');

// Profile stats elements
const daysStreakEl = document.getElementById('days-streak');
const totalPointsEl = document.getElementById('total-points');
const studyTimeEl = document.getElementById('study-time');
const completedLessonsEl = document.getElementById('completed-lessons');
const nextLevelProgressEl = document.getElementById('next-level-progress');
const activityListEl = document.getElementById('activity-list');

// Initialize profile page
function initializeProfilePage() {
  // Load user data from localStorage
  loadUserData();
  
  // Load user stats
  loadUserStats();
  
  // Load recent activity
  loadRecentActivity();
  
  // Add event listeners
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', openProfileModal);
  }
  
  if (closeProfileModal) {
    closeProfileModal.addEventListener('click', closeModal.bind(null, profileModal));
  }
  
  if (cancelProfileBtn) {
    cancelProfileBtn.addEventListener('click', closeModal.bind(null, profileModal));
  }
  
  if (profileForm) {
    profileForm.addEventListener('submit', saveUserProfile);
  }
  
  if (editSettingsBtn) {
    editSettingsBtn.addEventListener('click', openSettingsModal);
  }
  
  if (closeSettingsModal) {
    closeSettingsModal.addEventListener('click', closeModal.bind(null, settingsModal));
  }
  
  // Close modals when clicking outside
  window.addEventListener('click', event => {
    if (event.target === profileModal) {
      closeModal(profileModal);
    }
    
    if (event.target === settingsModal) {
      closeModal(settingsModal);
    }
  });
  
  // Close modals on ESC key
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!profileModal.classList.contains('hidden')) {
        closeModal(profileModal);
      }
      
      if (!settingsModal.classList.contains('hidden')) {
        closeModal(settingsModal);
      }
    }
  });
}

// Load user data from localStorage
function loadUserData() {
  const savedName = localStorage.getItem('userName');
  const savedEmail = localStorage.getItem('userEmail');
  
  if (savedName && userName) {
    userName.textContent = savedName;
  }
  
  if (savedName && profileNameInput) {
    profileNameInput.value = savedName;
  }
  
  if (savedEmail && profileEmailInput) {
    profileEmailInput.value = savedEmail;
  }
}

// Load user stats
function loadUserStats() {
  // Load streak
  const streak = localStorage.getItem('userStreak') || '0';
  if (daysStreakEl) daysStreakEl.textContent = streak;
  
  // Load points
  const points = localStorage.getItem('userPoints') || '0';
  if (totalPointsEl) totalPointsEl.textContent = points;
  
  // Load study time
  const studyHours = localStorage.getItem('userStudyHours') || '0';
  if (studyTimeEl) studyTimeEl.textContent = `${studyHours}h`;
  
  // Load completed lessons
  let completedCount = 0;
  for (let i = 1; i <= 20; i++) {
    const progress = localStorage.getItem(`lesson_${i}_progress`);
    if (progress && parseInt(progress) === 100) {
      completedCount++;
    }
  }
  
  if (completedLessonsEl) {
    completedLessonsEl.textContent = `${completedCount}/20`;
    
    // Update progress bar
    const progressBar = completedLessonsEl.closest('.overview-item').querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.width = `${(completedCount / 20) * 100}%`;
    }
  }
  
  // Update next level progress
  const pointsForNextLevel = 100;
  const currentPoints = parseInt(points);
  const progress = Math.min(100, (currentPoints / pointsForNextLevel) * 100);
  
  if (nextLevelProgressEl) {
    nextLevelProgressEl.textContent = `${currentPoints}/${pointsForNextLevel} puntos`;
    
    // Update progress bar
    const progressBar = nextLevelProgressEl.closest('.overview-item').querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }
  
  // Update level markers
  updateLevelMarkers(currentPoints);
}

// Update level markers
function updateLevelMarkers(points) {
  const levelMarkers = document.querySelectorAll('.level-marker');
  
  if (levelMarkers.length === 0) return;
  
  // Reset active state
  levelMarkers.forEach(marker => marker.classList.remove('active'));
  
  // Determine active level based on points
  let activeLevel;
  if (points >= 500) {
    activeLevel = 'C2';
  } else if (points >= 400) {
    activeLevel = 'C1';
  } else if (points >= 300) {
    activeLevel = 'B2';
  } else if (points >= 200) {
    activeLevel = 'B1';
  } else if (points >= 100) {
    activeLevel = 'A2';
  } else {
    activeLevel = 'A1';
  }
  
  // Set active marker
  const activeLevelMarker = document.querySelector(`.level-marker[data-level="${activeLevel}"]`);
  if (activeLevelMarker) {
    activeLevelMarker.classList.add('active');
  }
}

// Load recent activity
function loadRecentActivity() {
  if (!activityListEl) return;
  
  // Check for saved activities
  const savedActivities = localStorage.getItem('userActivities');
  
  if (!savedActivities) {
    // No activities, already showing default state
    return;
  }
  
  try {
    const activities = JSON.parse(savedActivities);
    
    if (activities.length === 0) {
      // No activities, already showing default state
      return;
    }
    
    // Clear no activity message
    activityListEl.innerHTML = '';
    
    // Add activity items
    activities.forEach(activity => {
      const activityItem = document.createElement('div');
      activityItem.className = 'activity-item';
      
      activityItem.innerHTML = `
        <div class="activity-icon ${activity.type}">
          <i class="fas ${activity.type === 'lesson' ? 'fa-book' : 'fa-clipboard-check'}"></i>
        </div>
        <div class="activity-info">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-time">${formatTimeAgo(activity.timestamp)}</div>
        </div>
        ${activity.points ? `<div class="activity-score">+${activity.points}</div>` : ''}
      `;
      
      activityListEl.appendChild(activityItem);
    });
  } catch (error) {
    console.error('Error loading activities:', error);
  }
}

// Open profile modal
function openProfileModal() {
  profileModal.classList.remove('hidden');
}

// Open settings modal
function openSettingsModal() {
  settingsModal.classList.remove('hidden');
}

// Close modal
function closeModal(modal) {
  modal.classList.add('hidden');
}

// Save user profile
function saveUserProfile(event) {
  event.preventDefault();
  
  const name = profileNameInput.value.trim();
  const email = profileEmailInput.value.trim();
  
  // Validate inputs (basic validation)
  if (!name) {
    showError('Por favor ingresa tu nombre');
    return;
  }
  
  // Save to localStorage
  localStorage.setItem('userName', name);
  localStorage.setItem('userEmail', email);
  
  // Update UI
  if (userName) {
    userName.textContent = name;
  }
  
  // Close modal
  closeModal(profileModal);
  
  // Show success notification
  if (window.showNotification) {
    window.showNotification('Perfil actualizado correctamente');
  }
}

// Helper function to format timestamp to relative time
function formatTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? 'hace 1 año' : `hace ${interval} años`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? 'hace 1 mes' : `hace ${interval} meses`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? 'hace 1 día' : `hace ${interval} días`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? 'hace 1 hora' : `hace ${interval} horas`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? 'hace 1 minuto' : `hace ${interval} minutos`;
  }
  
  return seconds < 5 ? 'justo ahora' : `hace ${seconds} segundos`;
}

// Show error message (simple alert for now)
function showError(message) {
  alert(message);
}
