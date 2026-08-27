// src/pages/NutrientTracker.jsx — theme-aware
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import FoodSearch from '../components/nutrient/FoodSearch';
import MacroBar from '../components/nutrient/MacroBar';
import MealLog from '../components/nutrient/MealLog';
import NutrientChart from '../components/nutrient/NutrientChart';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { Plus, BarChart3, List } from 'lucide-react';

const MACROS = [
  { key: 'calories', label: 'Calories', unit: 'kcal', color: 'bg-orange-400', emoji: '🔥' },
  { key: 'protein',  label: 'Protein',  unit: 'g',    color: 'bg-blue-400',   emoji: '💪' },
  { key: 'carbs',    label: 'Carbs',    unit: 'g',    color: 'bg-yellow-400', emoji: '🌾' },
  { key: 'fat',      label: 'Fat',      unit: 'g',    color: 'bg-purple-400', emoji: '🥑' },
  { key: 'fiber',    label: 'Fiber',    unit: 'g',    color: 'bg-green-400',  emoji: '🥦' },
];

const MICROS = [
  { key: 'calcium',  label: 'Calcium',   unit: 'mg',  color: 'bg-cyan-400',   emoji: '🦴' },
  { key: 'iron',     label: 'Iron',      unit: 'mg',  color: 'bg-red-400',    emoji: '⚡' },
  { key: 'vitaminC', label: 'Vitamin C', unit: 'mg',  color: 'bg-orange-300', emoji: '🍊' },
  { key: 'vitaminA', label: 'Vitamin A', unit: 'mcg', color: 'bg-amber-400',  emoji: '👁️' },
];

export default function NutrientTracker() {
  const { todayTotals, targets, addMeal } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [tab, setTab] = useState('log');

  const handleAdd = async (meal) => {
    await addMeal(meal);
    setShowAdd(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold theme-text-1">Nutrition Tracker</h1>
          <p className="theme-text-2 text-sm mt-1">Track your daily meals and nutrients</p>
        </div>
        <Button onClick={() => setShowAdd(true)} variant="gradient" size="md">
          <Plus className="w-4 h-4" /> Add Food
        </Button>
      </div>

      {/* Macros */}
      <Card>
        <h2 className="font-semibold theme-text-1 mb-5">Macronutrients</h2>
        <div className="space-y-4">
          {MACROS.map(({ key, label, unit, color, emoji }) => (
            <MacroBar key={key} label={label} value={todayTotals[key]} target={targets[key]} unit={unit} color={color} emoji={emoji} />
          ))}
        </div>
      </Card>

      {/* Micros */}
      <Card>
        <h2 className="font-semibold theme-text-1 mb-4">Micronutrients</h2>
        <div className="grid grid-cols-2 gap-4">
          {MICROS.map(({ key, label, unit, color, emoji }) => (
            <MacroBar key={key} label={label} value={todayTotals[key]} target={targets[key]} unit={unit} color={color} emoji={emoji} />
          ))}
        </div>
      </Card>

      {/* Log + Chart tabs */}
      <Card>
        <div className="flex items-center gap-1 mb-5 theme-elevated rounded-xl p-1">
          <button onClick={() => setTab('log')}
            className={`flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'log' ? 'bg-emerald-500 text-white' : 'theme-text-2 hover:theme-text-1'
            }`}>
            <List className="w-4 h-4" /> Today's Log
          </button>
          <button onClick={() => setTab('chart')}
            className={`flex items-center gap-2 flex-1 justify-center py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'chart' ? 'bg-emerald-500 text-white' : 'theme-text-2 hover:theme-text-1'
            }`}>
            <BarChart3 className="w-4 h-4" /> Weekly Chart
          </button>
        </div>
        {tab === 'log' ? <MealLog /> : (
          <div>
            <h3 className="text-sm theme-text-2 mb-4">Last 7 days — Calories & Protein</h3>
            <NutrientChart />
          </div>
        )}
      </Card>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="🥗 Add Food">
        <FoodSearch onAdd={handleAdd} />
      </Modal>
    </div>
  );
}
