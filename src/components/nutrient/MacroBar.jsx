// src/components/nutrient/MacroBar.jsx — theme-aware text + track
import { pct } from '../../utils/formatters';

export default function MacroBar({ label, value, target, unit, color, emoji }) {
  const p = pct(value, target);
  const over = p >= 100;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          {emoji && <span>{emoji}</span>}
          <span className="theme-text-1 font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`font-semibold ${over ? 'text-red-500' : 'theme-text-1'}`}>
            {typeof value === 'number' ? Math.round(value * 10) / 10 : value}
          </span>
          <span className="theme-text-3">/ {target} {unit}</span>
          <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${
            over
              ? 'bg-red-500/15 text-red-600 dark:text-red-400'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}>
            {p}%
          </span>
        </div>
      </div>
      {/* Track */}
      <div className="h-2.5 theme-elevated rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full progress-bar-fill ${over ? 'bg-red-400' : color}`}
          style={{ width: `${Math.min(p, 100)}%` }}
        />
      </div>
    </div>
  );
}
