// src/pages/Dashboard.jsx — theme-aware
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { greetingByTime } from '../utils/formatters';
import { requestNotificationPermission } from '../utils/streakUtils';
import StreakCard from '../components/dashboard/StreakCard';
import SummaryCard from '../components/dashboard/SummaryCard';
import ProgressWidget from '../components/dashboard/ProgressWidget';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Salad, Dumbbell, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { profile, todayTotals, targets, todayLog } = useApp();

  const displayName = profile?.name || user?.displayName || 'Friend';
  const hasLoggedToday = todayLog.meals.length > 0;
  const hour = new Date().getHours();
  const showNudge = !hasLoggedToday && hour >= 12;

  useEffect(() => { requestNotificationPermission(); }, []);

  const quickActions = [
    { icon: Salad,   label: 'Log Food',    to: '/nutrition', color: 'from-emerald-500 to-teal-400',  desc: 'Track your meals' },
    { icon: Dumbbell, label: 'Get Workout', to: '/exercise',  color: 'from-blue-500 to-cyan-400',    desc: 'Personalized plan' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold theme-text-1">
          {greetingByTime()}, <span className="gradient-text">{displayName}</span> 👋
        </h1>
        <p className="theme-text-2 text-sm mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {showNudge && (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl px-4 py-3 animate-slide-in">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-amber-600 dark:text-amber-300 text-sm">
            Don't break your streak! You haven't logged food today.{' '}
            <Link to="/nutrition" className="underline ml-1 font-medium">Log now →</Link>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressWidget />
        <StreakCard />
        <SummaryCard />
      </div>

      <div>
        <h2 className="text-lg font-semibold theme-text-1 mb-3">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickActions.map(({ icon: Icon, label, to, color, desc }) => (
            <Link key={to} to={to}>
              <div className="theme-card rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer">
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold theme-text-1">{label}</div>
                <div className="theme-text-2 text-sm mt-0.5">{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {todayLog.meals.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold theme-text-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Today's Meals
            </h3>
            <Link to="/nutrition"><Button variant="ghost" size="sm">View all →</Button></Link>
          </div>
          <div className="space-y-2">
            {todayLog.meals.slice(0, 4).map((meal, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b theme-border last:border-0">
                <div>
                  <div className="text-sm theme-text-1 font-medium">{meal.foodName}</div>
                  <div className="text-xs theme-text-3">{meal.mealType} · {meal.grams}g</div>
                </div>
                <div className="text-sm font-semibold text-orange-500 dark:text-orange-400">{meal.calories} kcal</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h3 className="font-semibold theme-text-1 mb-4">Micronutrients Today</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Fiber',     val: todayTotals.fiber,    target: targets.fiber,    unit: 'g',  color: 'text-green-500'  },
            { label: 'Calcium',   val: todayTotals.calcium,  target: targets.calcium,  unit: 'mg', color: 'text-cyan-500'   },
            { label: 'Iron',      val: todayTotals.iron,     target: targets.iron,     unit: 'mg', color: 'text-red-500'    },
            { label: 'Vitamin C', val: todayTotals.vitaminC, target: targets.vitaminC, unit: 'mg', color: 'text-yellow-500' },
          ].map(({ label, val, target, unit, color }) => (
            <div key={label} className="theme-elevated rounded-xl p-3 text-center">
              <div className={`text-xl font-bold ${color}`}>{Math.round(val)}</div>
              <div className="theme-text-3 text-xs">{unit} / {target}{unit}</div>
              <div className="theme-text-2 text-xs mt-0.5">{label}</div>
              <div className="mt-1.5 h-1 theme-card rounded-full overflow-hidden">
                <div className={`h-full ${color} bg-current rounded-full`}
                  style={{ width: `${Math.min(100, Math.round((val / target) * 100))}%`, transition: 'width 0.8s' }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
