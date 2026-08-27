// src/components/exercise/WorkoutCard.jsx — theme-aware
import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const LEVEL_COLOR = {
  Beginner:     'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30',
  Intermediate: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30',
  Advanced:     'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30',
};

export default function WorkoutCard({ exercise, index, completed, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const levelLabel = exercise.level?.[0] || 'Beginner';

  return (
    <div className={`rounded-2xl border transition-all duration-200 ${
      completed
        ? 'border-emerald-500/40 bg-emerald-500/5'
        : 'theme-border theme-elevated'
    }`}>
      <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <button onClick={e => { e.stopPropagation(); onToggle?.(); }}
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all font-bold text-sm ${
            completed ? 'bg-emerald-500 text-white' : 'theme-card theme-text-2 hover:theme-text-1'
          }`}>
          {completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">{exercise.emoji}</span>
            <span className="theme-text-1 font-semibold text-sm">{exercise.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-md border ${LEVEL_COLOR[levelLabel]}`}>{levelLabel}</span>
          </div>
          <div className="theme-text-3 text-xs mt-0.5">{exercise.muscleGroup}</div>
        </div>
        <div className="text-right flex-shrink-0 hidden sm:block">
          <div className="theme-text-1 text-sm font-semibold">{exercise.sets} × {exercise.reps}</div>
          <div className="theme-text-3 text-xs">{exercise.duration} min</div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 theme-text-3 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 theme-text-3 flex-shrink-0" />}
      </div>
      {expanded && (
        <div className="px-4 pb-4 animate-fade-in">
          <div className="theme-card rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{ label: 'Sets', val: exercise.sets }, { label: 'Reps/Time', val: exercise.reps }, { label: 'Rest', val: exercise.rest }].map(({ label, val }) => (
                <div key={label} className="theme-elevated rounded-lg p-2">
                  <div className="theme-text-1 font-bold text-sm">{val}</div>
                  <div className="theme-text-3 text-xs">{label}</div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs theme-text-2 font-medium mb-1">📋 How to do it:</p>
              <p className="theme-text-2 text-sm leading-relaxed">{exercise.instructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
