// src/data/exerciseLibrary.js
// Curated exercise catalog with metadata for the recommender system

export const EXERCISE_LIBRARY = {
  // ─── Strength / Muscle Gain ───────────────────────────────────
  strength: [
    { id: 'e001', name: 'Push-Ups', muscleGroup: 'Chest, Triceps, Shoulders', level: ['Beginner', 'Intermediate'],
      sets: 3, reps: '10-15', rest: '60s', duration: 5, emoji: '💪',
      instructions: 'Hands shoulder-width, lower chest to floor, push up. Keep core tight.' },
    { id: 'e002', name: 'Diamond Push-Ups', muscleGroup: 'Triceps, Chest', level: ['Intermediate', 'Advanced'],
      sets: 3, reps: '8-12', rest: '60s', duration: 5, emoji: '💎',
      instructions: 'Form diamond shape with hands under chest. Lower slowly, push up explosively.' },
    { id: 'e003', name: 'Pull-Ups', muscleGroup: 'Back, Biceps', level: ['Intermediate', 'Advanced'],
      sets: 3, reps: '5-10', rest: '90s', duration: 5, emoji: '🔝',
      instructions: 'Hang from bar, pull until chin over bar. Lower slowly.' },
    { id: 'e004', name: 'Bodyweight Squats', muscleGroup: 'Quads, Glutes, Hamstrings', level: ['Beginner'],
      sets: 3, reps: '15-20', rest: '45s', duration: 5, emoji: '🦵',
      instructions: 'Feet shoulder-width. Squat until thighs parallel to floor. Drive through heels.' },
    { id: 'e005', name: 'Jump Squats', muscleGroup: 'Quads, Glutes, Calves', level: ['Intermediate', 'Advanced'],
      sets: 3, reps: '12-15', rest: '60s', duration: 5, emoji: '🦵',
      instructions: 'Squat then explode upward. Land softly and immediately drop into next squat.' },
    { id: 'e006', name: 'Lunges', muscleGroup: 'Quads, Glutes, Hamstrings', level: ['Beginner', 'Intermediate'],
      sets: 3, reps: '10 each leg', rest: '60s', duration: 6, emoji: '🏃',
      instructions: 'Step forward, lower back knee toward floor. Push through front heel to return.' },
    { id: 'e007', name: 'Plank', muscleGroup: 'Core, Shoulders', level: ['Beginner', 'Intermediate'],
      sets: 3, reps: '30-60 sec hold', rest: '30s', duration: 4, emoji: '🤸',
      instructions: 'Forearms on floor, body straight from head to heels. Engage core throughout.' },
    { id: 'e008', name: 'Burpees', muscleGroup: 'Full Body', level: ['Intermediate', 'Advanced'],
      sets: 3, reps: '10-15', rest: '90s', duration: 8, emoji: '🔥',
      instructions: 'From standing, drop to push-up, do push-up, jump feet to hands, jump and clap overhead.' },
    { id: 'e009', name: 'Mountain Climbers', muscleGroup: 'Core, Shoulders, Cardio', level: ['Beginner', 'Intermediate'],
      sets: 3, reps: '30 sec', rest: '30s', duration: 4, emoji: '⛰️',
      instructions: 'Plank position, drive knees toward chest alternately at speed.' },
    { id: 'e010', name: 'Dips (Chair)', muscleGroup: 'Triceps, Chest', level: ['Beginner', 'Intermediate'],
      sets: 3, reps: '10-15', rest: '60s', duration: 5, emoji: '🪑',
      instructions: 'Hands on chair edge, lower body until elbows 90°, push up.' },
    { id: 'e011', name: 'Pike Push-Ups', muscleGroup: 'Shoulders, Triceps', level: ['Intermediate'],
      sets: 3, reps: '8-12', rest: '60s', duration: 5, emoji: '🏔️',
      instructions: 'Form inverted V with hips high, lower head toward floor.' },
    { id: 'e012', name: 'Glute Bridges', muscleGroup: 'Glutes, Hamstrings, Core', level: ['Beginner'],
      sets: 3, reps: '15-20', rest: '30s', duration: 4, emoji: '🍑',
      instructions: 'Lie on back, feet flat, drive hips up squeezing glutes. Hold at top.' },
  ],

  // ─── Cardio / Endurance ───────────────────────────────────────
  cardio: [
    { id: 'c001', name: 'Jumping Jacks', muscleGroup: 'Full Body Cardio', level: ['Beginner'],
      sets: 3, reps: '1 min', rest: '30s', duration: 5, emoji: '⭐',
      instructions: 'Jump feet wide while raising arms overhead simultaneously.' },
    { id: 'c002', name: 'High Knees', muscleGroup: 'Core, Cardio', level: ['Beginner', 'Intermediate'],
      sets: 3, reps: '45 sec', rest: '30s', duration: 4, emoji: '🏃',
      instructions: 'Jog in place driving knees to waist height, pumping arms.' },
    { id: 'c003', name: 'Jump Rope (Shadow)', muscleGroup: 'Calves, Cardio', level: ['Beginner'],
      sets: 4, reps: '1 min', rest: '30s', duration: 6, emoji: '🪢',
      instructions: 'Mimic jump rope motion: hop on balls of feet, rotate wrists.' },
    { id: 'c004', name: 'Skater Jumps', muscleGroup: 'Glutes, Cardio, Balance', level: ['Intermediate'],
      sets: 3, reps: '12 each side', rest: '45s', duration: 5, emoji: '⛷️',
      instructions: 'Leap laterally landing on one foot, swing other leg behind.' },
    { id: 'c005', name: 'Box Step-Ups', muscleGroup: 'Quads, Glutes, Cardio', level: ['Beginner'],
      sets: 3, reps: '10 each leg', rest: '45s', duration: 5, emoji: '📦',
      instructions: 'Step onto elevated surface (chair/step), drive knee up, step down.' },
    { id: 'c006', name: 'Running in Place', muscleGroup: 'Full Body Cardio', level: ['Beginner'],
      sets: 1, reps: '10 min continuous', rest: '0s', duration: 10, emoji: '🏃',
      instructions: 'Maintain easy jogging pace in place. Focus on breathing rhythm.' },
    { id: 'c007', name: 'Tuck Jumps', muscleGroup: 'Core, Legs, Cardio', level: ['Advanced'],
      sets: 3, reps: '8-10', rest: '90s', duration: 5, emoji: '🤸',
      instructions: 'Jump and pull both knees to chest at peak. Land softly.' },
  ],

  // ─── Flexibility / Yoga ───────────────────────────────────────
  flexibility: [
    { id: 'y001', name: 'Surya Namaskar (Sun Salutation)', muscleGroup: 'Full Body', level: ['Beginner', 'Intermediate'],
      sets: 5, reps: '1 cycle', rest: '30s', duration: 15, emoji: '🌅',
      instructions: '12-pose sequence: Mountain → Forward fold → Plank → Cobra → Downdog → repeat.' },
    { id: 'y002', name: 'Downward Dog', muscleGroup: 'Hamstrings, Calves, Shoulders', level: ['Beginner'],
      sets: 3, reps: '30 sec hold', rest: '15s', duration: 3, emoji: '🐕',
      instructions: 'Inverted V shape, press heels toward floor, arms straight.' },
    { id: 'y003', name: 'Cobra Pose', muscleGroup: 'Back, Core', level: ['Beginner'],
      sets: 3, reps: '20 sec hold', rest: '15s', duration: 3, emoji: '🐍',
      instructions: 'Lie prone, place hands under shoulders, gently arch back.' },
    { id: 'y004', name: 'Child\'s Pose', muscleGroup: 'Back, Hips', level: ['Beginner'],
      sets: 2, reps: '45 sec hold', rest: '15s', duration: 3, emoji: '🧘',
      instructions: 'Kneel, sit on heels, extend arms forward, rest forehead on floor.' },
    { id: 'y005', name: 'Pigeon Pose', muscleGroup: 'Hip Flexors, Glutes', level: ['Intermediate'],
      sets: 2, reps: '45 sec each side', rest: '15s', duration: 5, emoji: '🕊️',
      instructions: 'From plank, bring one shin forward parallel to hips, extend other leg back.' },
    { id: 'y006', name: 'Standing Hamstring Stretch', muscleGroup: 'Hamstrings', level: ['Beginner'],
      sets: 2, reps: '30 sec each leg', rest: '10s', duration: 3, emoji: '🦵',
      instructions: 'Stand, extend leg on surface, hinge at hips reaching toward toes.' },
    { id: 'y007', name: 'Cat-Cow Stretch', muscleGroup: 'Spine, Core', level: ['Beginner'],
      sets: 3, reps: '10 cycles', rest: '15s', duration: 3, emoji: '🐈',
      instructions: 'On hands and knees, alternate arching (cow) and rounding (cat) the spine.' },
    { id: 'y008', name: 'Warrior I', muscleGroup: 'Legs, Hips, Shoulders', level: ['Beginner'],
      sets: 2, reps: '30 sec each side', rest: '15s', duration: 4, emoji: '⚔️',
      instructions: 'Lunge forward, raise arms overhead, back heel grounded at 45°.' },
  ],

  // ─── Weight Loss HIIT ──────────────────────────────────────────
  hiit: [
    { id: 'h001', name: 'HIIT Circuit (Bodyweight)', muscleGroup: 'Full Body', level: ['Intermediate', 'Advanced'],
      sets: 4, reps: '20s work / 10s rest', rest: '90s between rounds', duration: 20, emoji: '🔥',
      instructions: 'Rotate: Squat → Mountain Climber → Burpee → High Knees → Plank. 4 rounds.' },
    { id: 'h002', name: 'Tabata Push-Ups', muscleGroup: 'Chest, Core', level: ['Intermediate'],
      sets: 8, reps: '20s max / 10s rest', rest: '1 min after all 8', duration: 8, emoji: '⚡',
      instructions: '8 rounds of 20 sec max push-ups followed by 10 sec rest.' },
    { id: 'h003', name: 'Sprint Intervals (In Place)', muscleGroup: 'Full Body Cardio', level: ['Beginner', 'Intermediate'],
      sets: 8, reps: '30s sprint / 30s walk', rest: '2 min after all sets', duration: 12, emoji: '💨',
      instructions: 'Alternate max effort running in place with slow walking in place.' },
  ],
};

/**
 * Generate a workout plan based on user preferences.
 * Used as fallback if Gemini API fails.
 */
export function generateLocalWorkout({ timeAvailable, fitnessLevel, goal }) {
  const timeMin = parseInt(timeAvailable);
  let exercises = [];
  let totalDuration = 0;

  // Warm-up always first
  const warmup = [
    { id: 'wu1', name: 'Warm-Up: Arm Circles', sets: 2, reps: '30s', duration: 2, emoji: '🔄', muscleGroup: 'Shoulders', instructions: 'Rotate arms in large circles, forward then backward.' },
    { id: 'wu2', name: 'Warm-Up: Leg Swings', sets: 2, reps: '10 each', duration: 2, emoji: '🦵', muscleGroup: 'Hips', instructions: 'Hold wall for balance, swing each leg forward and back.' },
  ];
  exercises = [...warmup];
  totalDuration += 4;

  // Select pool based on goal
  let pool = [];
  if (goal === 'Weight Loss') pool = [...EXERCISE_LIBRARY.hiit, ...EXERCISE_LIBRARY.cardio];
  else if (goal === 'Muscle Gain') pool = [...EXERCISE_LIBRARY.strength];
  else if (goal === 'Flexibility') pool = [...EXERCISE_LIBRARY.flexibility];
  else pool = [...EXERCISE_LIBRARY.cardio, ...EXERCISE_LIBRARY.strength]; // Endurance

  // Filter by fitness level
  const levelMap = { 'Beginner': ['Beginner'], 'Intermediate': ['Beginner', 'Intermediate'], 'Advanced': ['Beginner', 'Intermediate', 'Advanced'] };
  const eligible = pool.filter(e => e.level.some(l => (levelMap[fitnessLevel] || ['Beginner']).includes(l)));

  // Fill up to timeAvailable - 5 min cooldown
  const target = timeMin - 4; // leave room for cooldown
  for (const ex of eligible) {
    if (totalDuration + ex.duration > target) break;
    exercises.push(ex);
    totalDuration += ex.duration;
  }

  // Cooldown
  exercises.push({ id: 'cd1', name: 'Cool-Down: Deep Breathing', sets: 1, reps: '2 min', duration: 2, emoji: '🧘', muscleGroup: 'Full Body', instructions: 'Inhale 4s, hold 4s, exhale 6s. Repeat for 2 minutes.' });
  exercises.push({ id: 'cd2', name: 'Cool-Down: Full Body Stretch', sets: 1, reps: '3 min', duration: 3, emoji: '🤸', muscleGroup: 'Full Body', instructions: 'Hold each major muscle group stretch for 20-30 seconds.' });

  return exercises;
}
