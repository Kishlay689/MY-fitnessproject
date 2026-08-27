// src/components/exercise/GoalForm.jsx — theme-aware
import Button from '../ui/Button';

const TIME_OPTIONS = ['15', '30', '45', '60'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const GOALS = ['Weight Loss', 'Muscle Gain', 'Flexibility', 'Endurance'];

export default function GoalForm({ form, setForm, onGenerate, loading }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium theme-text-2 mb-3">⏱️ Time Available</label>
        <div className="grid grid-cols-4 gap-2">
          {TIME_OPTIONS.map(t => (
            <button key={t} onClick={() => setForm(f => ({ ...f, timeAvailable: t }))}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all border ${
                form.timeAvailable === t
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                  : 'theme-elevated theme-text-2 theme-border hover:theme-text-1 hover:border-emerald-400'
              }`}>
              {t} min
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium theme-text-2 mb-3">💪 Fitness Level</label>
        <div className="grid grid-cols-3 gap-2">
          {LEVELS.map(l => (
            <button key={l} onClick={() => setForm(f => ({ ...f, fitnessLevel: l }))}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all border ${
                form.fitnessLevel === l
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'theme-elevated theme-text-2 theme-border hover:theme-text-1 hover:border-blue-400'
              }`}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium theme-text-2 mb-3">🎯 Your Goal</label>
        <div className="grid grid-cols-2 gap-2">
          {GOALS.map(g => (
            <button key={g} onClick={() => setForm(f => ({ ...f, goal: g }))}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all border text-left ${
                form.goal === g
                  ? 'bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/20'
                  : 'theme-elevated theme-text-2 theme-border hover:theme-text-1 hover:border-purple-400'
              }`}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={onGenerate} variant="gradient" size="lg" className="w-full" loading={loading}>
        ✨ Generate My Workout Plan
      </Button>
    </div>
  );
}
