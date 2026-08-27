// src/data/nutrientTargets.js
// Recommended Daily Allowances (RDA) based on ICMR-NIN 2020 guidelines
// Default targets are for an average healthy adult

export const DEFAULT_TARGETS = {
  calories: 2000,
  protein: 60,       // grams
  carbs: 250,        // grams
  fat: 65,           // grams
  fiber: 30,         // grams
  calcium: 1000,     // mg
  iron: 17,          // mg
  vitaminC: 65,      // mg
  vitaminA: 600,     // mcg RAE
};

/**
 * Calculate personalized calorie target using Mifflin-St Jeor equation.
 * @param {object} profile - { age, weight (kg), height (cm), gender, activityLevel, goal }
 */
export function calculateTargets(profile) {
  const { age, weight, height, gender, activityLevel, goal } = profile;

  // Basal Metabolic Rate
  let bmr;
  if (gender === 'female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  }

  // Activity multipliers
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  const tdee = bmr * (activityFactors[activityLevel] || 1.55);

  // Goal adjustment
  let calories = Math.round(tdee);
  if (goal === 'Weight Loss') calories = Math.round(tdee - 400);
  if (goal === 'Muscle Gain') calories = Math.round(tdee + 300);

  // Macro split (40C/30P/30F for general, high-protein for muscle)
  let proteinPct = goal === 'Muscle Gain' ? 0.35 : 0.25;
  let carbsPct = goal === 'Weight Loss' ? 0.35 : 0.45;
  let fatPct = 1 - proteinPct - carbsPct;

  return {
    calories,
    protein: Math.round((calories * proteinPct) / 4),
    carbs: Math.round((calories * carbsPct) / 4),
    fat: Math.round((calories * fatPct) / 9),
    fiber: weight >= 80 ? 35 : 30,
    calcium: age >= 50 ? 1200 : 1000,
    iron: gender === 'female' && age < 50 ? 21 : 17,
    vitaminC: 65,
    vitaminA: gender === 'female' ? 600 : 750,
  };
}
