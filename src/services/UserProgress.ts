
interface UserProgress {
  level: string;
  points: number;
  lessonsCompleted: number;
  daysStreak: number;
  minutesLearned: number;
  badges: string[];
  lastActiveDate?: string;
  consecutiveDays?: number;
  favoriteTopics?: string[];
}

const defaultProgress: UserProgress = {
  level: "A1",
  points: 0,
  lessonsCompleted: 0,
  daysStreak: 1,
  minutesLearned: 0,
  badges: ["Principiante"],
  consecutiveDays: 1,
  favoriteTopics: []
};

export const initUserProgress = (): void => {
  // Comprobar si es la primera vez que el usuario usa la app
  if (!localStorage.getItem("userInitialized")) {
    localStorage.setItem("userLevel", defaultProgress.level);
    localStorage.setItem("userPoints", defaultProgress.points.toString());
    localStorage.setItem("lessonsCompleted", defaultProgress.lessonsCompleted.toString());
    localStorage.setItem("daysStreak", defaultProgress.daysStreak.toString());
    localStorage.setItem("minutesLearned", defaultProgress.minutesLearned.toString());
    localStorage.setItem("userBadges", JSON.stringify(defaultProgress.badges));
    localStorage.setItem("lastActiveDate", new Date().toISOString().split('T')[0]);
    localStorage.setItem("consecutiveDays", defaultProgress.consecutiveDays!.toString());
    localStorage.setItem("favoriteTopics", JSON.stringify(defaultProgress.favoriteTopics));
    localStorage.setItem("userInitialized", "true");
  } else {
    // Update streak if it's a new day
    updateDailyStreak();
  }
};

const updateDailyStreak = (): void => {
  const today = new Date().toISOString().split('T')[0];
  const lastActiveDate = localStorage.getItem("lastActiveDate") || today;
  
  if (lastActiveDate !== today) {
    // Calculate the difference in days
    const lastDate = new Date(lastActiveDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // If user was active yesterday, increase streak
    if (diffDays === 1) {
      const currentStreak = parseInt(localStorage.getItem("consecutiveDays") || "1");
      localStorage.setItem("consecutiveDays", (currentStreak + 1).toString());
      
      // Update the daysStreak if the consecutive days is higher
      const daysStreak = parseInt(localStorage.getItem("daysStreak") || "1");
      if (currentStreak + 1 > daysStreak) {
        localStorage.setItem("daysStreak", (currentStreak + 1).toString());
        
        // Check for streak badges
        checkStreakBadges(currentStreak + 1);
      }
    } 
    // If user missed a day or more, reset consecutive days
    else if (diffDays > 1) {
      localStorage.setItem("consecutiveDays", "1");
    }
    
    // Update last active date
    localStorage.setItem("lastActiveDate", today);
  }
};

export const addUserPoints = (points: number): number => {
  const currentPoints = parseInt(localStorage.getItem("userPoints") || "0");
  const newPoints = currentPoints + points;
  localStorage.setItem("userPoints", newPoints.toString());
  
  // Check for point-based badges
  checkPointBadges(newPoints);
  
  return newPoints;
};

export const completeLesson = (minutes: number): void => {
  // Update daily streak first
  updateDailyStreak();
  
  // Incrementar lecciones completadas
  const lessonsCompleted = parseInt(localStorage.getItem("lessonsCompleted") || "0");
  const newLessonsCompleted = lessonsCompleted + 1;
  localStorage.setItem("lessonsCompleted", newLessonsCompleted.toString());
  
  // Actualizar tiempo de estudio
  const minutesLearned = parseInt(localStorage.getItem("minutesLearned") || "0");
  localStorage.setItem("minutesLearned", (minutesLearned + minutes).toString());
  
  // Añadir puntos por completar lección (10 puntos base + 1 por minuto)
  addUserPoints(10 + minutes);
  
  // Comprobar si hay nuevas insignias que otorgar
  checkLessonBadges(newLessonsCompleted);
  checkTimeBadges(minutesLearned + minutes);
};

export const addFavoriteTopic = (topic: string): void => {
  if (!topic) return;
  
  const favorites = JSON.parse(localStorage.getItem("favoriteTopics") || "[]");
  if (!favorites.includes(topic)) {
    favorites.push(topic);
    localStorage.setItem("favoriteTopics", JSON.stringify(favorites));
  }
};

export const removeFavoriteTopic = (topic: string): void => {
  if (!topic) return;
  
  let favorites = JSON.parse(localStorage.getItem("favoriteTopics") || "[]");
  favorites = favorites.filter((fav: string) => fav !== topic);
  localStorage.setItem("favoriteTopics", JSON.stringify(favorites));
};

const checkLessonBadges = (lessonsCompleted: number): void => {
  let badges = JSON.parse(localStorage.getItem("userBadges") || '["Principiante"]');
  
  // Insignias por completar lecciones
  const lessonMilestones = [
    { count: 5, badge: "5 lecciones completadas" },
    { count: 10, badge: "10 lecciones completadas" },
    { count: 25, badge: "25 lecciones completadas" },
    { count: 50, badge: "50 lecciones completadas" },
    { count: 100, badge: "100 lecciones completadas" }
  ];
  
  lessonMilestones.forEach(milestone => {
    if (lessonsCompleted >= milestone.count && !badges.includes(milestone.badge)) {
      badges.push(milestone.badge);
    }
  });
  
  localStorage.setItem("userBadges", JSON.stringify(badges));
};

const checkPointBadges = (points: number): void => {
  let badges = JSON.parse(localStorage.getItem("userBadges") || '["Principiante"]');
  
  // Insignias por puntos acumulados
  const pointMilestones = [
    { count: 100, badge: "100 puntos" },
    { count: 500, badge: "500 puntos" },
    { count: 1000, badge: "1000 puntos" },
    { count: 5000, badge: "5000 puntos" }
  ];
  
  pointMilestones.forEach(milestone => {
    if (points >= milestone.count && !badges.includes(milestone.badge)) {
      badges.push(milestone.badge);
    }
  });
  
  localStorage.setItem("userBadges", JSON.stringify(badges));
};

const checkTimeBadges = (minutes: number): void => {
  let badges = JSON.parse(localStorage.getItem("userBadges") || '["Principiante"]');
  
  // Insignias por tiempo de estudio
  const timeMilestones = [
    { count: 60, badge: "1 hora de estudio" },
    { count: 300, badge: "5 horas de estudio" },
    { count: 600, badge: "10 horas de estudio" }
  ];
  
  timeMilestones.forEach(milestone => {
    if (minutes >= milestone.count && !badges.includes(milestone.badge)) {
      badges.push(milestone.badge);
    }
  });
  
  localStorage.setItem("userBadges", JSON.stringify(badges));
};

const checkStreakBadges = (days: number): void => {
  let badges = JSON.parse(localStorage.getItem("userBadges") || '["Principiante"]');
  
  // Insignias por racha de días
  const streakMilestones = [
    { count: 3, badge: "3 días consecutivos" },
    { count: 7, badge: "7 días consecutivos" },
    { count: 14, badge: "14 días consecutivos" },
    { count: 30, badge: "30 días consecutivos" }
  ];
  
  streakMilestones.forEach(milestone => {
    if (days >= milestone.count && !badges.includes(milestone.badge)) {
      badges.push(milestone.badge);
    }
  });
  
  localStorage.setItem("userBadges", JSON.stringify(badges));
};

export const getUserProgress = (): UserProgress => {
  return {
    level: localStorage.getItem("userLevel") || defaultProgress.level,
    points: parseInt(localStorage.getItem("userPoints") || "0"),
    lessonsCompleted: parseInt(localStorage.getItem("lessonsCompleted") || "0"),
    daysStreak: parseInt(localStorage.getItem("daysStreak") || "1"),
    minutesLearned: parseInt(localStorage.getItem("minutesLearned") || "0"),
    badges: JSON.parse(localStorage.getItem("userBadges") || JSON.stringify(defaultProgress.badges)),
    lastActiveDate: localStorage.getItem("lastActiveDate"),
    consecutiveDays: parseInt(localStorage.getItem("consecutiveDays") || "1"),
    favoriteTopics: JSON.parse(localStorage.getItem("favoriteTopics") || "[]")
  };
};

// Get next level based on current level
export const getNextLevel = (currentLevel: string): string => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const currentIndex = levels.indexOf(currentLevel);
  
  if (currentIndex < levels.length - 1) {
    return levels[currentIndex + 1];
  }
  
  return currentLevel; // Already at max level
};

// Determine points needed for next level
export const getPointsForNextLevel = (currentLevel: string): number => {
  const levelPoints = {
    "A1": 500,
    "A2": 1000,
    "B1": 2000,
    "B2": 3500,
    "C1": 5000,
    "C2": Infinity
  };
  
  return levelPoints[currentLevel as keyof typeof levelPoints] || Infinity;
};

// Calculate progress percentage to next level
export const getLevelProgress = (): number => {
  const currentLevel = localStorage.getItem("userLevel") || "A1";
  const currentPoints = parseInt(localStorage.getItem("userPoints") || "0");
  const pointsNeeded = getPointsForNextLevel(currentLevel);
  
  if (currentLevel === "C2") return 100; // Max level
  
  // Calculate previous level threshold
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const currentIndex = levels.indexOf(currentLevel);
  const prevLevelPoints = currentIndex > 0 ? getPointsForNextLevel(levels[currentIndex - 1]) : 0;
  
  // Calculate progress within current level
  const pointsInCurrentLevel = currentPoints - prevLevelPoints;
  const pointsRangeForLevel = pointsNeeded - prevLevelPoints;
  
  return Math.min(Math.floor((pointsInCurrentLevel / pointsRangeForLevel) * 100), 100);
};

// Check if user can level up and handle level up
export const checkLevelUp = (): boolean => {
  const currentLevel = localStorage.getItem("userLevel") || "A1";
  const currentPoints = parseInt(localStorage.getItem("userPoints") || "0");
  const pointsNeeded = getPointsForNextLevel(currentLevel);
  
  if (currentLevel !== "C2" && currentPoints >= pointsNeeded) {
    const nextLevel = getNextLevel(currentLevel);
    localStorage.setItem("userLevel", nextLevel);
    
    // Add level up badge
    let badges = JSON.parse(localStorage.getItem("userBadges") || '["Principiante"]');
    const levelUpBadge = `¡Nivel ${nextLevel} alcanzado!`;
    
    if (!badges.includes(levelUpBadge)) {
      badges.push(levelUpBadge);
      localStorage.setItem("userBadges", JSON.stringify(badges));
    }
    
    return true;
  }
  
  return false;
};
