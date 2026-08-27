// src/components/dashboard/SummaryCard.jsx — theme-aware
import { useApp } from '../../context/AppContext';
import { pct } from '../../utils/formatters';
import Card from '../ui/Card';

export default function SummaryCard() {
  const { todayTotals, targets } = useApp();
  const macros = [
    { label: 'Calories', value: todayTotals.calories, target: targets.calories, unit: 'kcal', color: 'bg-orange-400' },
    { label: 'Protein',  value: todayTotals.protein,  target: targets.protein,  unit: 'g',    color: 'bg-blue-400'   },
    { label: 'Carbs',    value: todayTotals.carbs,    target: targets.carbs,    unit: 'g',    color: 'bg-yellow-400' },
    { label: 'Fat',      value: todayTotals.fat,      target: targets.fat,      unit: 'g',    color: 'bg-purple-400' },
  ];
  return (
    <Card>
      <h3 className="theme-text-2 text-sm font-medium mb-4">Today's Progress</h3>
      <div className="space-y-3">
        {macros.map(({ label, value, target, unit, color }) => {
          const p = pct(value, target);
          return (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="theme-text-2">{label}</span>
                <span className="theme-text-2">{Math.round(value)} / {target} {unit}</span>
              </div>
              <div className="h-2 theme-elevated rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full progress-bar-fill`} style={{ width: `${p}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
