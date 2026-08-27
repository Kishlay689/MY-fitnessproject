// src/utils/streakUtils.js
export function getStreakMessage(streak) {
  if (streak === 0) return "Start your streak today! 💪";
  if (streak === 1) return "Day 1 — let's keep it going! 🌱";
  if (streak < 7)  return `${streak} days strong — don't stop now! 🔥`;
  if (streak < 30) return `${streak} days! You're on fire! 🔥🔥`;
  return `${streak} days — absolute legend! 🏆`;
}

export function scheduleNotification(title, body, delayMs) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    setTimeout(() => new Notification(title, { body, icon: '/favicon.ico' }), delayMs);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') {
        setTimeout(() => new Notification(title, { body, icon: '/favicon.ico' }), delayMs);
      }
    });
  }
}

export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}
