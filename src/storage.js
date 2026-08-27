// src/storage.js
// localStorage-based data layer — replaces Firebase Firestore entirely
// All data is keyed by user ID (just a local UUID stored on signup)

const PREFIX = 'vitatrack_';

function key(...parts) {
  return PREFIX + parts.join('_');
}

function get(k) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}

function set(k, value) {
  try {
    localStorage.setItem(k, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage write failed:', e);
  }
}

// ─── Auth ────────────────────────────────────────────────────
export function getLocalUser() {
  return get(key('user'));
}

export function saveLocalUser(user) {
  set(key('user'), user);
}

export function clearLocalUser() {
  localStorage.removeItem(key('user'));
}

// Generate a simple local ID
export function generateId() {
  return 'user_' + Math.random().toString(36).slice(2, 11);
}

// ─── Profile ─────────────────────────────────────────────────
export function getProfile(uid) {
  return get(key(uid, 'profile'));
}

export function saveProfile(uid, profile) {
  set(key(uid, 'profile'), profile);
}

// ─── Nutrition Logs ──────────────────────────────────────────
export function getNutritionLog(uid, date) {
  return get(key(uid, 'nutrition', date)) || { date, meals: [] };
}

export function saveNutritionLog(uid, date, log) {
  set(key(uid, 'nutrition', date), log);
}

export function getLast7DaysLogs(uid) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const log = getNutritionLog(uid, dateStr);
    const meals = log.meals || [];
    days.push({
      date: dateStr.slice(5), // MM-DD
      calories: Math.round(meals.reduce((s, m) => s + (m.calories || 0), 0)),
      protein: Math.round(meals.reduce((s, m) => s + (m.protein || 0), 0)),
    });
  }
  return days;
}

// ─── Workout Logs ─────────────────────────────────────────────
export function getWorkoutLog(uid, date) {
  return get(key(uid, 'workout', date));
}

export function saveWorkoutLog(uid, date, log) {
  set(key(uid, 'workout', date), log);
}

// ─── Streak ───────────────────────────────────────────────────
export function getStreak(uid) {
  return get(key(uid, 'streak')) || { currentStreak: 0, longestStreak: 0, lastLogDate: null };
}

export function saveStreak(uid, streak) {
  set(key(uid, 'streak'), streak);
}

export function updateStreak(uid) {
  const todayStr = new Date().toISOString().split('T')[0];
  const streak = getStreak(uid);
  const { lastLogDate, currentStreak, longestStreak } = streak;

  if (lastLogDate === todayStr) return streak; // already updated today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const newStreak = lastLogDate === yesterdayStr ? currentStreak + 1 : 1;
  const newLongest = Math.max(newStreak, longestStreak);
  const newStreakData = { currentStreak: newStreak, longestStreak: newLongest, lastLogDate: todayStr };

  saveStreak(uid, newStreakData);
  return newStreakData;
}
