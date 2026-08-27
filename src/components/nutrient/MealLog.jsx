// src/components/nutrient/MealLog.jsx — theme-aware
import { Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MEAL_ORDER = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
const MEAL_EMOJI = { Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙', Snacks: '🍎' };

export default function MealLog() {
  const { todayLog, removeMeal } = useApp();
  const meals = todayLog.meals || [];

  if (meals.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-3">🍽️</div>
        <p className="theme-text-2">No meals logged yet today.</p>
        <p className="theme-text-3 text-sm mt-1">Search for a food and add it above!</p>
      </div>
    );
  }

  const grouped = MEAL_ORDER.reduce((acc, type) => {
    const items = meals.map((m, i) => ({ ...m, _index: i })).filter(m => m.mealType === type);
    if (items.length) acc[type] = items;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([type, items]) => {
        const typeCalories = items.reduce((s, m) => s + (m.calories || 0), 0);
        return (
          <div key={type}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold theme-text-2 flex items-center gap-2 text-sm">
                {MEAL_EMOJI[type]} {type}
              </h4>
              <span className="text-xs theme-text-3">{Math.round(typeCalories)} kcal</span>
            </div>
            <div className="space-y-2">
              {items.map((meal) => (
                <div key={meal._index} className="flex items-center justify-between theme-elevated rounded-xl px-4 py-3 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{meal.emoji || '🍛'}</span>
                    <div>
                      <div className="theme-text-1 text-sm font-medium">{meal.foodName}</div>
                      <div className="theme-text-3 text-xs mt-0.5">
                        {meal.grams}g · P:{meal.protein}g · C:{meal.carbs}g · F:{meal.fat}g
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500 dark:text-orange-400 font-semibold text-sm">{meal.calories} kcal</span>
                    <button onClick={() => removeMeal(meal._index)}
                      className="theme-text-3 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
