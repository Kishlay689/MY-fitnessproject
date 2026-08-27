// src/components/exercise/WorkoutPlan.jsx — theme-aware
import { useState } from 'react';
import WorkoutCard from './WorkoutCard';
import Button from '../ui/Button';
import { CheckCircle, RotateCcw } from 'lucide-react';

export default function WorkoutPlan({ exercises, onReset, onComplete }) {
  const [completed, setCompleted] = useState(new Set());

  const toggle = (id) => setCompleted(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const allDone = exercises.length > 0 && completed.size >= exercises.length;
  const progress = exercises.length > 0 ? Math.round((completed.size / exercises.length) * 100) : 0;
  const totalDuration = exercises.reduce((s, e) => s + (e.duration || 0), 0);

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="theme-elevated rounded-2xl p-4 flex items-center justify-between gap-4">
        <div>
          <p className="theme-text-1 font-semibold">{exercises.length} exercises · {totalDuration} min total</p>
          <p className="theme-text-2 text-sm">{completed.size} / {exercises.length} completed</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 theme-card rounded-full overflow-hidden border theme-border">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">{progress}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {exercises.map((ex, i) => (
          <WorkoutCard key={ex.id || i} exercise={ex} index={i}
            completed={completed.has(ex.id || i)} onToggle={() => toggle(ex.id || i)} />
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={onReset} className="flex-1">
          <RotateCcw className="w-4 h-4" /> New Plan
        </Button>
        <Button variant={allDone ? 'gradient' : 'primary'} onClick={onComplete} className="flex-1">
          <CheckCircle className="w-4 h-4" /> {allDone ? 'Log Workout ✓' : 'Mark Complete'}
        </Button>
      </div>
    </div>
  );
}
