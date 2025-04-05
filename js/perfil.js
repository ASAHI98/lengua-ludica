document.addEventListener('DOMContentLoaded', function() {
  // Load user data from localStorage
  loadUserData();
  
  // Tab switching
  setupTabs();
  
  // Modal functionality
  setupModals();
});

function loadUserData() {
  // User info
  const userName = localStorage.getItem('userName') || 'Estudiante';
  const userLevel = localStorage.getItem('userLevel') || 'A1';
  
  document.getElementById('user-name').textContent = userName;
  document.getElementById('user-level').textContent = `Nivel ${userLevel}`;
  document.getElementById('edit-username').value = userName;
  
  // Stats
  const lessonsCompleted = parseInt(localStorage.getItem('lessonsCompleted') || '0');
  const daysStreak = parseInt(localStorage.getItem('daysStreak') || '1');
  const minutesLearned = parseInt(localStorage.getItem('minutesLearned') || '0');
  const pointsEarned = parseInt(localStorage.getItem('userPoints') || '0');
  
  // Update stats in both locations
  document.getElementById('lessons-completed').textContent = lessonsCompleted;
  document.getElementById('days-streak').textContent = daysStreak;
  document.getElementById('points-earned').textContent = pointsEarned;
  
  document.getElementById('stats-lessons').textContent = lessonsCompleted;
  document.getElementById('stats-streak').textContent = daysStreak;
  document.getElementById('stats-minutes').textContent = minutesLearned;
  document.getElementById('stats-points').textContent = pointsEarned;
  
  // Badges
  loadBadges();
}

function loadBadges() {
  const badges = JSON.parse(localStorage.getItem('userBadges') || '["Principiante"]');
  const badgesContainer = document.getElementById('badges-container');
  
  // Clear existing badges
  badgesContainer.innerHTML = '';
  
  // Add earned badges
  badges.forEach(badge => {
    const badgeElement = createBadgeElement(badge, false);
    badgesContainer.appendChild(badgeElement);
  });
  
  // Add locked badges
  const lockedBadges = ['Intermedio', 'Avanzado', 'Experto'];
  lockedBadges.forEach(badge => {
    const badgeElement = createBadgeElement(badge, true);
    badgesContainer.appendChild(badgeElement);
  });
}

function createBadgeElement(name, locked) {
  const badge = document.createElement('div');
  badge.className = `badge-card ${locked ? 'locked' : ''}`;
  
  const icon = document.createElement('div');
  icon.className = 'badge-icon';
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v5M5 12H1M12 23v-5M23 12h-5"/><circle cx="12" cy="12" r="4"/><path d="m19 19-2.8-2.8M16.8 7.2 19 5M5 19l2.8-2.8M7.2 7.2 5 5"/></svg>`;
  
  const badgeName = document.createElement('div');
  badgeName.className = 'badge-name';
  badgeName.textContent = locked ? 'Bloqueada' : name;
  
  badge.appendChild(icon);
  badge.appendChild(badgeName);
  
  return badge;
}

function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show selected tab content
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${tabName}-tab`).classList.add('active');
    });
  });
}

function setupModals() {
  // Profile editor
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const profileEditorModal = document.getElementById('profile-editor-modal');
  const cancelEditBtn = document.getElementById('cancel-edit');
  const profileEditForm = document.getElementById('profile-edit-form');
  
  editProfileBtn.addEventListener('click', () => {
    profileEditorModal.classList.remove('hidden');
  });
  
  cancelEditBtn.addEventListener('click', () => {
    profileEditorModal.classList.add('hidden');
  });
  
  profileEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUsername = document.getElementById('edit-username').value;
    
    if (newUsername.trim() !== '') {
      localStorage.setItem('userName', newUsername);
      document.getElementById('user-name').textContent = newUsername;
      profileEditorModal.classList.add('hidden');
    }
  });
  
  // Settings modal
  const settingsBtn = document.getElementById('settings-btn');
  const settingsModal = document.getElementById('settings-modal');
  const cancelSettingsBtn = document.getElementById('cancel-settings');
  const saveSettingsBtn = document.getElementById('save-settings');
  const resetProgressBtn = document.getElementById('reset-progress');
  
  settingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
  });
  
  cancelSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });
  
  saveSettingsBtn.addEventListener('click', () => {
    // Save notification and sound settings
    const notificationsEnabled = document.getElementById('notifications-toggle').checked;
    const soundsEnabled = document.getElementById('sounds-toggle').checked;
    
    localStorage.setItem('notificationsEnabled', notificationsEnabled);
    localStorage.setItem('soundsEnabled', soundsEnabled);
    
    settingsModal.classList.add('hidden');
  });
  
  resetProgressBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
      // Reset user progress
      localStorage.setItem('lessonsCompleted', '0');
      localStorage.setItem('userLevel', 'A1');
      localStorage.setItem('userPoints', '0');
      localStorage.setItem('minutesLearned', '0');
      localStorage.setItem('userBadges', '["Principiante"]');
      
      // Keep streak and username
      loadUserData();
      settingsModal.classList.add('hidden');
    }
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === profileEditorModal) {
      profileEditorModal.classList.add('hidden');
    }
    if (e.target === settingsModal) {
      settingsModal.classList.add('hidden');
    }
  });
}
