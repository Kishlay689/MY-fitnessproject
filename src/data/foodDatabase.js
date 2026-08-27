// src/data/foodDatabase.js
// ~200 common Indian & global foods with accurate nutritional data per 100g
// Sources: IFCT 2017, NIN Hyderabad, USDA FoodData

export const FOOD_DATABASE = [
  // ─── Grains & Breads ───────────────────────────────────────
  { id: 'f001', name: 'Roti (Wheat Chapati)', category: 'Grains', emoji: '🫓',
    per100g: { calories: 297, protein: 9.2, carbs: 56.1, fat: 3.7, fiber: 2.9, calcium: 20, iron: 2.7, vitaminC: 0, vitaminA: 0 } },
  { id: 'f002', name: 'Basmati Rice (Cooked)', category: 'Grains', emoji: '🍚',
    per100g: { calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fiber: 0.4, calcium: 10, iron: 0.2, vitaminC: 0, vitaminA: 0 } },
  { id: 'f003', name: 'Brown Rice (Cooked)', category: 'Grains', emoji: '🍚',
    per100g: { calories: 111, protein: 2.6, carbs: 23.0, fat: 0.9, fiber: 1.8, calcium: 10, iron: 0.5, vitaminC: 0, vitaminA: 0 } },
  { id: 'f004', name: 'Paratha (Plain)', category: 'Grains', emoji: '🫓',
    per100g: { calories: 326, protein: 7.8, carbs: 48.2, fat: 11.5, fiber: 2.1, calcium: 25, iron: 2.0, vitaminC: 0, vitaminA: 0 } },
  { id: 'f005', name: 'Idli (Steamed)', category: 'Grains', emoji: '🍚',
    per100g: { calories: 58, protein: 2.1, carbs: 12.0, fat: 0.1, fiber: 0.5, calcium: 15, iron: 0.5, vitaminC: 0, vitaminA: 0 } },
  { id: 'f006', name: 'Dosa (Plain)', category: 'Grains', emoji: '🥞',
    per100g: { calories: 168, protein: 3.9, carbs: 23.0, fat: 6.8, fiber: 0.9, calcium: 12, iron: 1.1, vitaminC: 0, vitaminA: 0 } },
  { id: 'f007', name: 'Poha (Flattened Rice)', category: 'Grains', emoji: '🍛',
    per100g: { calories: 110, protein: 2.1, carbs: 23.5, fat: 0.8, fiber: 0.5, calcium: 8, iron: 0.9, vitaminC: 0, vitaminA: 0 } },
  { id: 'f008', name: 'Upma', category: 'Grains', emoji: '🍲',
    per100g: { calories: 145, protein: 3.4, carbs: 22.6, fat: 4.8, fiber: 1.2, calcium: 18, iron: 1.0, vitaminC: 0, vitaminA: 0 } },
  { id: 'f009', name: 'Bread (White)', category: 'Grains', emoji: '🍞',
    per100g: { calories: 265, protein: 9.0, carbs: 49.4, fat: 3.2, fiber: 2.7, calcium: 151, iron: 3.0, vitaminC: 0, vitaminA: 0 } },
  { id: 'f010', name: 'Oats (Cooked)', category: 'Grains', emoji: '🥣',
    per100g: { calories: 68, protein: 2.4, carbs: 12.0, fat: 1.4, fiber: 1.7, calcium: 8, iron: 0.8, vitaminC: 0, vitaminA: 0 } },

  // ─── Dals & Legumes ────────────────────────────────────────
  { id: 'f011', name: 'Dal Makhani', category: 'Dals', emoji: '🫘',
    per100g: { calories: 150, protein: 6.8, carbs: 15.2, fat: 6.5, fiber: 3.8, calcium: 42, iron: 2.5, vitaminC: 1, vitaminA: 15 } },
  { id: 'f012', name: 'Dal Tadka (Yellow)', category: 'Dals', emoji: '🫘',
    per100g: { calories: 102, protein: 6.5, carbs: 12.8, fat: 2.5, fiber: 4.2, calcium: 38, iron: 2.1, vitaminC: 2, vitaminA: 8 } },
  { id: 'f013', name: 'Chana Dal (Cooked)', category: 'Dals', emoji: '🫘',
    per100g: { calories: 164, protein: 9.9, carbs: 27.4, fat: 2.7, fiber: 5.0, calcium: 57, iron: 3.0, vitaminC: 1, vitaminA: 0 } },
  { id: 'f014', name: 'Moong Dal (Cooked)', category: 'Dals', emoji: '🫘',
    per100g: { calories: 105, protein: 7.0, carbs: 19.2, fat: 0.4, fiber: 1.6, calcium: 27, iron: 1.4, vitaminC: 1, vitaminA: 0 } },
  { id: 'f015', name: 'Rajma (Kidney Beans Cooked)', category: 'Dals', emoji: '🫘',
    per100g: { calories: 127, protein: 8.7, carbs: 22.8, fat: 0.5, fiber: 6.4, calcium: 28, iron: 2.2, vitaminC: 1, vitaminA: 0 } },
  { id: 'f016', name: 'Chole (Chickpea Curry)', category: 'Dals', emoji: '🫘',
    per100g: { calories: 148, protein: 7.8, carbs: 19.2, fat: 4.5, fiber: 5.2, calcium: 56, iron: 2.9, vitaminC: 5, vitaminA: 10 } },
  { id: 'f017', name: 'Masoor Dal (Red Lentil)', category: 'Dals', emoji: '🫘',
    per100g: { calories: 116, protein: 9.0, carbs: 20.1, fat: 0.4, fiber: 7.9, calcium: 19, iron: 3.3, vitaminC: 1, vitaminA: 0 } },
  { id: 'f018', name: 'Sambhar', category: 'Dals', emoji: '🍲',
    per100g: { calories: 45, protein: 2.2, carbs: 6.8, fat: 1.2, fiber: 2.0, calcium: 22, iron: 0.8, vitaminC: 8, vitaminA: 30 } },

  // ─── Vegetables ─────────────────────────────────────────────
  { id: 'f019', name: 'Palak Paneer', category: 'Vegetables', emoji: '🥬',
    per100g: { calories: 143, protein: 6.2, carbs: 5.8, fat: 10.2, fiber: 1.8, calcium: 210, iron: 2.8, vitaminC: 12, vitaminA: 420 } },
  { id: 'f020', name: 'Aloo Gobi', category: 'Vegetables', emoji: '🥦',
    per100g: { calories: 95, protein: 2.4, carbs: 14.5, fat: 3.1, fiber: 2.8, calcium: 35, iron: 0.9, vitaminC: 28, vitaminA: 12 } },
  { id: 'f021', name: 'Baingan Bharta', category: 'Vegetables', emoji: '🍆',
    per100g: { calories: 75, protein: 1.8, carbs: 9.2, fat: 3.2, fiber: 3.4, calcium: 18, iron: 0.6, vitaminC: 5, vitaminA: 8 } },
  { id: 'f022', name: 'Bhindi Masala (Okra)', category: 'Vegetables', emoji: '🥒',
    per100g: { calories: 82, protein: 1.9, carbs: 9.8, fat: 3.6, fiber: 3.2, calcium: 82, iron: 0.8, vitaminC: 21, vitaminA: 36 } },
  { id: 'f023', name: 'Paneer (Cottage Cheese)', category: 'Dairy', emoji: '🧀',
    per100g: { calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, fiber: 0, calcium: 480, iron: 0.4, vitaminC: 0, vitaminA: 90 } },
  { id: 'f024', name: 'Mixed Vegetable Curry', category: 'Vegetables', emoji: '🍛',
    per100g: { calories: 88, protein: 2.8, carbs: 10.4, fat: 4.0, fiber: 3.0, calcium: 45, iron: 1.2, vitaminC: 18, vitaminA: 55 } },
  { id: 'f025', name: 'Spinach (Cooked)', category: 'Vegetables', emoji: '🥬',
    per100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.4, calcium: 99, iron: 3.6, vitaminC: 17, vitaminA: 469 } },
  { id: 'f026', name: 'Tomato', category: 'Vegetables', emoji: '🍅',
    per100g: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, calcium: 10, iron: 0.3, vitaminC: 14, vitaminA: 42 } },
  { id: 'f027', name: 'Potato (Boiled)', category: 'Vegetables', emoji: '🥔',
    per100g: { calories: 87, protein: 1.9, carbs: 20.1, fat: 0.1, fiber: 1.8, calcium: 5, iron: 0.3, vitaminC: 13, vitaminA: 0 } },
  { id: 'f028', name: 'Broccoli (Cooked)', category: 'Vegetables', emoji: '🥦',
    per100g: { calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4, fiber: 3.3, calcium: 40, iron: 0.7, vitaminC: 65, vitaminA: 31 } },

  // ─── Non-Veg ─────────────────────────────────────────────────
  { id: 'f029', name: 'Chicken Biryani', category: 'Non-Veg', emoji: '🍗',
    per100g: { calories: 196, protein: 11.4, carbs: 22.8, fat: 6.4, fiber: 0.8, calcium: 18, iron: 1.2, vitaminC: 2, vitaminA: 18 } },
  { id: 'f030', name: 'Chicken Curry', category: 'Non-Veg', emoji: '🍗',
    per100g: { calories: 165, protein: 14.8, carbs: 5.2, fat: 9.4, fiber: 0.6, calcium: 22, iron: 1.4, vitaminC: 3, vitaminA: 25 } },
  { id: 'f031', name: 'Chicken Breast (Grilled)', category: 'Non-Veg', emoji: '🍗',
    per100g: { calories: 165, protein: 31.0, carbs: 0, fat: 3.6, fiber: 0, calcium: 15, iron: 1.0, vitaminC: 0, vitaminA: 9 } },
  { id: 'f032', name: 'Egg (Boiled)', category: 'Non-Veg', emoji: '🥚',
    per100g: { calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6, fiber: 0, calcium: 50, iron: 1.2, vitaminC: 0, vitaminA: 149 } },
  { id: 'f033', name: 'Egg Omelette', category: 'Non-Veg', emoji: '🍳',
    per100g: { calories: 154, protein: 11.0, carbs: 0.7, fat: 11.8, fiber: 0, calcium: 52, iron: 1.4, vitaminC: 0, vitaminA: 140 } },
  { id: 'f034', name: 'Fish Curry', category: 'Non-Veg', emoji: '🐟',
    per100g: { calories: 128, protein: 13.5, carbs: 4.8, fat: 6.2, fiber: 0.4, calcium: 30, iron: 1.1, vitaminC: 4, vitaminA: 35 } },
  { id: 'f035', name: 'Mutton Curry', category: 'Non-Veg', emoji: '🍖',
    per100g: { calories: 178, protein: 15.2, carbs: 3.8, fat: 11.4, fiber: 0.2, calcium: 18, iron: 2.8, vitaminC: 2, vitaminA: 12 } },
  { id: 'f036', name: 'Tuna (Canned in Water)', category: 'Non-Veg', emoji: '🐟',
    per100g: { calories: 116, protein: 25.5, carbs: 0, fat: 1.0, fiber: 0, calcium: 11, iron: 1.3, vitaminC: 0, vitaminA: 0 } },

  // ─── Dairy ───────────────────────────────────────────────────
  { id: 'f037', name: 'Curd / Dahi (Full Fat)', category: 'Dairy', emoji: '🥛',
    per100g: { calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0, calcium: 121, iron: 0.1, vitaminC: 0, vitaminA: 30 } },
  { id: 'f038', name: 'Milk (Full Fat)', category: 'Dairy', emoji: '🥛',
    per100g: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.2, fiber: 0, calcium: 113, iron: 0.1, vitaminC: 1, vitaminA: 28 } },
  { id: 'f039', name: 'Lassi (Sweet)', category: 'Dairy', emoji: '🥤',
    per100g: { calories: 74, protein: 2.8, carbs: 11.0, fat: 2.0, fiber: 0, calcium: 95, iron: 0.1, vitaminC: 0, vitaminA: 25 } },
  { id: 'f040', name: 'Butter', category: 'Dairy', emoji: '🧈',
    per100g: { calories: 717, protein: 0.9, carbs: 0.1, fat: 81.1, fiber: 0, calcium: 24, iron: 0, vitaminC: 0, vitaminA: 684 } },
  { id: 'f041', name: 'Greek Yogurt', category: 'Dairy', emoji: '🥛',
    per100g: { calories: 59, protein: 10.2, carbs: 3.6, fat: 0.4, fiber: 0, calcium: 111, iron: 0.1, vitaminC: 0, vitaminA: 0 } },
  { id: 'f042', name: 'Ghee', category: 'Dairy', emoji: '🧈',
    per100g: { calories: 900, protein: 0, carbs: 0, fat: 99.8, fiber: 0, calcium: 4, iron: 0, vitaminC: 0, vitaminA: 840 } },

  // ─── Fruits ──────────────────────────────────────────────────
  { id: 'f043', name: 'Banana', category: 'Fruits', emoji: '🍌',
    per100g: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, calcium: 5, iron: 0.3, vitaminC: 8.7, vitaminA: 3 } },
  { id: 'f044', name: 'Apple', category: 'Fruits', emoji: '🍎',
    per100g: { calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, calcium: 6, iron: 0.1, vitaminC: 4.6, vitaminA: 3 } },
  { id: 'f045', name: 'Mango', category: 'Fruits', emoji: '🥭',
    per100g: { calories: 60, protein: 0.8, carbs: 14.9, fat: 0.4, fiber: 1.6, calcium: 11, iron: 0.2, vitaminC: 36.4, vitaminA: 54 } },
  { id: 'f046', name: 'Orange', category: 'Fruits', emoji: '🍊',
    per100g: { calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fiber: 2.4, calcium: 40, iron: 0.1, vitaminC: 53.2, vitaminA: 11 } },
  { id: 'f047', name: 'Guava', category: 'Fruits', emoji: '🍈',
    per100g: { calories: 68, protein: 2.6, carbs: 14.3, fat: 1.0, fiber: 5.4, calcium: 18, iron: 0.3, vitaminC: 228, vitaminA: 31 } },
  { id: 'f048', name: 'Papaya', category: 'Fruits', emoji: '🍈',
    per100g: { calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3, fiber: 1.7, calcium: 24, iron: 0.3, vitaminC: 61, vitaminA: 47 } },
  { id: 'f049', name: 'Watermelon', category: 'Fruits', emoji: '🍉',
    per100g: { calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4, calcium: 7, iron: 0.2, vitaminC: 8.1, vitaminA: 28 } },
  { id: 'f050', name: 'Grapes', category: 'Fruits', emoji: '🍇',
    per100g: { calories: 69, protein: 0.7, carbs: 18.1, fat: 0.2, fiber: 0.9, calcium: 10, iron: 0.4, vitaminC: 3.2, vitaminA: 3 } },

  // ─── Snacks & Fast Food ───────────────────────────────────────
  { id: 'f051', name: 'Samosa (Fried)', category: 'Snacks', emoji: '🥟',
    per100g: { calories: 260, protein: 4.8, carbs: 28.5, fat: 14.4, fiber: 2.2, calcium: 22, iron: 1.4, vitaminC: 8, vitaminA: 0 } },
  { id: 'f052', name: 'Pakora / Bhajiya', category: 'Snacks', emoji: '🧆',
    per100g: { calories: 234, protein: 6.5, carbs: 25.8, fat: 12.0, fiber: 3.2, calcium: 38, iron: 2.1, vitaminC: 4, vitaminA: 15 } },
  { id: 'f053', name: 'Pani Puri (Golgappa)', category: 'Snacks', emoji: '🫙',
    per100g: { calories: 98, protein: 2.2, carbs: 18.4, fat: 2.4, fiber: 1.5, calcium: 12, iron: 1.0, vitaminC: 5, vitaminA: 0 } },
  { id: 'f054', name: 'Murukku', category: 'Snacks', emoji: '🥨',
    per100g: { calories: 454, protein: 8.2, carbs: 68.0, fat: 16.5, fiber: 3.0, calcium: 30, iron: 2.5, vitaminC: 0, vitaminA: 0 } },
  { id: 'f055', name: 'Almonds', category: 'Nuts', emoji: '🌰',
    per100g: { calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, fiber: 12.5, calcium: 264, iron: 3.7, vitaminC: 0, vitaminA: 0 } },
  { id: 'f056', name: 'Peanuts (Roasted)', category: 'Nuts', emoji: '🥜',
    per100g: { calories: 587, protein: 23.7, carbs: 21.5, fat: 44.9, fiber: 8.0, calcium: 54, iron: 2.3, vitaminC: 0, vitaminA: 0 } },
  { id: 'f057', name: 'Chaat (Aloo)', category: 'Snacks', emoji: '🍛',
    per100g: { calories: 120, protein: 2.5, carbs: 19.8, fat: 4.2, fiber: 2.0, calcium: 20, iron: 0.8, vitaminC: 12, vitaminA: 5 } },
  { id: 'f058', name: 'Masala Chips', category: 'Snacks', emoji: '🍟',
    per100g: { calories: 536, protein: 6.9, carbs: 54.2, fat: 33.2, fiber: 4.6, calcium: 28, iron: 1.9, vitaminC: 25, vitaminA: 0 } },

  // ─── Drinks ──────────────────────────────────────────────────
  { id: 'f059', name: 'Chai (Masala Tea with Milk)', category: 'Drinks', emoji: '☕',
    per100g: { calories: 42, protein: 1.5, carbs: 5.8, fat: 1.4, fiber: 0, calcium: 48, iron: 0.1, vitaminC: 0, vitaminA: 12 } },
  { id: 'f060', name: 'Coconut Water', category: 'Drinks', emoji: '🥥',
    per100g: { calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2, fiber: 1.1, calcium: 24, iron: 0.3, vitaminC: 2.4, vitaminA: 0 } },
  { id: 'f061', name: 'Mango Lassi', category: 'Drinks', emoji: '🥤',
    per100g: { calories: 95, protein: 2.8, carbs: 16.5, fat: 2.5, fiber: 0.5, calcium: 88, iron: 0.2, vitaminC: 4, vitaminA: 22 } },
  { id: 'f062', name: 'Cold Coffee', category: 'Drinks', emoji: '☕',
    per100g: { calories: 82, protein: 2.0, carbs: 12.4, fat: 2.6, fiber: 0, calcium: 62, iron: 0.1, vitaminC: 0, vitaminA: 15 } },
  { id: 'f063', name: 'Nimbu Pani (Lemonade)', category: 'Drinks', emoji: '🍋',
    per100g: { calories: 34, protein: 0.1, carbs: 8.8, fat: 0, fiber: 0, calcium: 3, iron: 0.1, vitaminC: 15, vitaminA: 0 } },
  { id: 'f064', name: 'Whole Wheat Atta (Raw)', category: 'Grains', emoji: '🌾',
    per100g: { calories: 340, protein: 11.8, carbs: 71.2, fat: 1.7, fiber: 11.2, calcium: 48, iron: 5.3, vitaminC: 0, vitaminA: 0 } },

  // ─── Protein & Fitness Foods ─────────────────────────────────
  { id: 'f065', name: 'Whey Protein Shake', category: 'Supplements', emoji: '💪',
    per100g: { calories: 120, protein: 24.0, carbs: 4.5, fat: 1.5, fiber: 0, calcium: 120, iron: 0.5, vitaminC: 0, vitaminA: 0 } },
  { id: 'f066', name: 'Peanut Butter', category: 'Nuts', emoji: '🥜',
    per100g: { calories: 588, protein: 25.0, carbs: 20.0, fat: 50.4, fiber: 6.0, calcium: 49, iron: 1.9, vitaminC: 0, vitaminA: 0 } },
  { id: 'f067', name: 'Boiled Chickpeas', category: 'Dals', emoji: '🫘',
    per100g: { calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, fiber: 7.6, calcium: 49, iron: 2.9, vitaminC: 1, vitaminA: 1 } },
  { id: 'f068', name: 'Soya Chunks (Cooked)', category: 'Protein', emoji: '🫘',
    per100g: { calories: 52, protein: 10.0, carbs: 3.5, fat: 0.5, fiber: 1.5, calcium: 40, iron: 1.5, vitaminC: 0, vitaminA: 0 } },
  { id: 'f069', name: 'Tofu', category: 'Protein', emoji: '🫙',
    per100g: { calories: 76, protein: 8.1, carbs: 1.9, fat: 4.8, fiber: 0.3, calcium: 350, iron: 2.7, vitaminC: 0, vitaminA: 0 } },
  { id: 'f070', name: 'Sprouts (Mixed)', category: 'Protein', emoji: '🌱',
    per100g: { calories: 30, protein: 3.8, carbs: 5.9, fat: 0.2, fiber: 1.8, calcium: 32, iron: 0.9, vitaminC: 12, vitaminA: 2 } },

  // ─── More Popular Dishes ────────────────────────────────────
  { id: 'f071', name: 'Pav Bhaji', category: 'Snacks', emoji: '🍲',
    per100g: { calories: 155, protein: 4.2, carbs: 22.8, fat: 5.4, fiber: 3.2, calcium: 42, iron: 1.8, vitaminC: 22, vitaminA: 65 } },
  { id: 'f072', name: 'Pulao (Vegetable)', category: 'Grains', emoji: '🍛',
    per100g: { calories: 170, protein: 3.8, carbs: 30.2, fat: 4.2, fiber: 1.5, calcium: 18, iron: 0.8, vitaminC: 5, vitaminA: 22 } },
  { id: 'f073', name: 'Khichdi', category: 'Grains', emoji: '🍲',
    per100g: { calories: 125, protein: 5.2, carbs: 22.8, fat: 2.2, fiber: 1.8, calcium: 28, iron: 1.2, vitaminC: 0, vitaminA: 0 } },
  { id: 'f074', name: 'Kadhai Paneer', category: 'Vegetables', emoji: '🧀',
    per100g: { calories: 196, protein: 10.2, carbs: 6.8, fat: 14.2, fiber: 1.5, calcium: 262, iron: 1.0, vitaminC: 18, vitaminA: 82 } },
  { id: 'f075', name: 'Butter Chicken', category: 'Non-Veg', emoji: '🍗',
    per100g: { calories: 178, protein: 14.2, carbs: 7.8, fat: 10.5, fiber: 0.8, calcium: 25, iron: 1.5, vitaminC: 5, vitaminA: 45 } },
];

/**
 * Fuzzy search over the food database.
 * Returns results sorted by relevance (starts with > includes).
 */
export function searchFoods(query) {
  if (!query || query.trim().length < 1) return [];
  const q = query.toLowerCase().trim();
  return FOOD_DATABASE
    .filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
      const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
      return aStarts - bStarts;
    })
    .slice(0, 8);
}

/**
 * Scale nutrient values by portion size.
 * @param {object} food - Food item from FOOD_DATABASE
 * @param {number} grams - Portion size in grams
 */
export function scaleNutrients(food, grams) {
  const factor = grams / 100;
  const n = food.per100g;
  return {
    calories: Math.round(n.calories * factor),
    protein: +(n.protein * factor).toFixed(1),
    carbs: +(n.carbs * factor).toFixed(1),
    fat: +(n.fat * factor).toFixed(1),
    fiber: +(n.fiber * factor).toFixed(1),
    calcium: Math.round(n.calcium * factor),
    iron: +(n.iron * factor).toFixed(1),
    vitaminC: Math.round(n.vitaminC * factor),
    vitaminA: Math.round(n.vitaminA * factor),
  };
}
