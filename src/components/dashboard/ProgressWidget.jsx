// src/components/dashboard/ProgressWidget.jsx — theme-aware
import { useApp } from '../../context/AppContext';
import { pct } from '../../utils/formatters';
import Card from '../ui/Card';

function Ring({ value, max, size = 120, stroke = 10, color = '#10b981' }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const p = pct(value, max);
  const offset = circ - (p / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-elevated)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
    </svg>
  );
}

export default function ProgressWidget() {
  const { todayTotals, targets } = useApp();
  const calPct = pct(todayTotals.calories, targets.calories);
  const remaining = targets.calories - Math.round(todayTotals.calories);

  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <h3 className="theme-text-2 text-sm font-medium mb-4">Calorie Goal</h3>
      <div className="relative">
        <Ring value={todayTotals.calories} max={targets.calories} size={130} stroke={12} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black theme-text-1">{calPct}%</span>
          <span className="theme-text-3 text-xs">of goal</span>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-lg font-bold theme-text-1">
          {Math.round(todayTotals.calories)} <span className="theme-text-2 text-sm font-normal">kcal</span>
        </p>
        <p className="theme-text-3 text-xs">
          {remaining > 0 ? `${remaining} kcal remaining` : 'Goal reached! 🎉'}
        </p>
      </div>
    </Card>
  );
}
