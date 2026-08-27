// src/components/nutrient/FoodSearch.jsx — theme-aware
import { useState, useRef, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { searchFoods, scaleNutrients } from '../../data/foodDatabase';
import Button from '../ui/Button';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export default function FoodSearch({ onAdd }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [grams, setGrams] = useState(100);
  const [mealType, setMealType] = useState('Breakfast');
  const inputRef = useRef(null);

  useEffect(() => { setResults(searchFoods(query)); }, [query]);

  const handleSelect = (food) => { setSelected(food); setQuery(food.name); setResults([]); };

  const handleAdd = () => {
    if (!selected) return;
    const nutrients = scaleNutrients(selected, grams);
    onAdd({ foodId: selected.id, foodName: selected.name, emoji: selected.emoji, grams, mealType, ...nutrients, loggedAt: new Date().toISOString() });
    setQuery(''); setSelected(null); setGrams(100);
    inputRef.current?.focus();
  };

  const scaled = selected ? scaleNutrients(selected, grams) : null;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-3" />
        <input ref={inputRef} type="text" placeholder="Search food (e.g. dal, roti, chicken…)"
          value={query} onChange={e => { setQuery(e.target.value); setSelected(null); }}
          className="w-full theme-input border rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:border-emerald-500 transition-colors" />
        {query && (
          <button onClick={() => { setQuery(''); setSelected(null); setResults([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 theme-text-3 hover:theme-text-1">
            <X className="w-4 h-4" />
          </button>
        )}
        {results.length > 0 && !selected && (
          <div className="absolute top-full left-0 right-0 mt-1 theme-card rounded-xl shadow-xl z-10 overflow-hidden">
            {results.map(food => (
              <button key={food.id} onClick={() => handleSelect(food)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:theme-elevated transition-colors text-left">
                <span className="text-xl">{food.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="theme-text-1 text-sm font-medium truncate">{food.name}</div>
                  <div className="theme-text-3 text-xs">{food.category} · {food.per100g.calories} kcal/100g</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          <div>
            <label className="block text-xs theme-text-2 mb-1.5">Portion (grams)</label>
            <input type="number" min="1" max="1000" value={grams} onChange={e => setGrams(Number(e.target.value))}
              className="w-full theme-input border rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-xs theme-text-2 mb-1.5">Meal Type</label>
            <select value={mealType} onChange={e => setMealType(e.target.value)}
              className="w-full theme-input border rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500">
              {MEAL_TYPES.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
      )}

      {scaled && (
        <div className="theme-elevated rounded-xl p-4 animate-fade-in">
          <p className="text-xs theme-text-2 mb-3 font-medium">Nutritional Preview ({grams}g)</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'Calories', val: scaled.calories, unit: 'kcal', color: 'text-orange-500' },
              { label: 'Protein', val: scaled.protein, unit: 'g', color: 'text-blue-500' },
              { label: 'Carbs', val: scaled.carbs, unit: 'g', color: 'text-yellow-500' },
              { label: 'Fat', val: scaled.fat, unit: 'g', color: 'text-purple-500' },
            ].map(({ label, val, unit, color }) => (
              <div key={label} className="theme-card rounded-lg p-2">
                <div className={`font-bold text-sm ${color}`}>{val}</div>
                <div className="theme-text-3 text-xs">{unit}</div>
                <div className="theme-text-2 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={handleAdd} disabled={!selected} variant="gradient" className="w-full" size="lg">
        <Plus className="w-4 h-4" /> Add to Log
      </Button>
    </div>
  );
}
