
interface UserProgress {
  level: string;
  points: number;
  lessonsCompleted: number;
  daysStreak: number;
  minutesLearned: number;
  badges: string[];
}

const defaultProgress: UserProgress = {
  level: "A1",
  points: 0,
  lessonsCompleted: 0,
  daysStreak: 1,
  minutesLearned: 0,
  badges: ["Principiante"]
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
    localStorage.setItem("userInitialized", "true");
  }
};

export const addUserPoints = (points: number): number => {
  const currentPoints = parseInt(localStorage.getItem("userPoints") || "0");
  const newPoints = currentPoints + points;
  localStorage.setItem("userPoints", newPoints.toString());
  return newPoints;
};

export const completeLesson = (minutes: number): void => {
  // Incrementar lecciones completadas
  const lessonsCompleted = parseInt(localStorage.getItem("lessonsCompleted") || "0");
  localStorage.setItem("lessonsCompleted", (lessonsCompleted + 1).toString());
  
  // Actualizar tiempo de estudio
  const minutesLearned = parseInt(localStorage.getItem("minutesLearned") || "0");
  localStorage.setItem("minutesLearned", (minutesLearned + minutes).toString());
  
  // Añadir puntos por completar lección (10 puntos base + 1 por minuto)
  addUserPoints(10 + minutes);
  
  // Comprobar si hay nuevas insignias que otorgar
  checkBadges();
};

const checkBadges = (): void => {
  const lessonsCompleted = parseInt(localStorage.getItem("lessonsCompleted") || "0");
  const daysStreak = parseInt(localStorage.getItem("daysStreak") || "1");
  let badges = JSON.parse(localStorage.getItem("userBadges") || '["Principiante"]');
  
  // Insignia por completar 5 lecciones
  if (lessonsCompleted >= 5 && !badges.includes("5 lecciones completadas")) {
    badges.push("5 lecciones completadas");
  }
  
  // Insignia por 7 días consecutivos
  if (daysStreak >= 7 && !badges.includes("7 días consecutivos")) {
    badges.push("7 días consecutivos");
  }
  
  localStorage.setItem("userBadges", JSON.stringify(badges));
};

export const getUserProgress = (): UserProgress => {
  return {
    level: localStorage.getItem("userLevel") || defaultProgress.level,
    points: parseInt(localStorage.getItem("userPoints") || "0"),
    lessonsCompleted: parseInt(localStorage.getItem("lessonsCompleted") || "0"),
    daysStreak: parseInt(localStorage.getItem("daysStreak") || "1"),
    minutesLearned: parseInt(localStorage.getItem("minutesLearned") || "0"),
    badges: JSON.parse(localStorage.getItem("userBadges") || JSON.stringify(defaultProgress.badges))
  };
};
