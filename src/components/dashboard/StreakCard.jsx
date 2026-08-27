// src/components/dashboard/StreakCard.jsx — theme-aware
import { Flame, Trophy, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getStreakMessage } from '../../utils/streakUtils';
import Card from '../ui/Card';

export default function StreakCard() {
  const { streak } = useApp();
  const { currentStreak, longestStreak, lastLogDate } = streak;
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="theme-text-2 text-sm font-medium">Daily Streak</h3>
          <div className="w-8 h-8 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
        </div>
        <div className="flex items-end gap-3 mb-2">
          <div className="text-5xl font-black text-orange-500 dark:text-orange-400">{currentStreak}</div>
          <div className="theme-text-2 text-sm mb-1">days</div>
        </div>
        <p className="text-sm theme-text-2 mb-4">{getStreakMessage(currentStreak)}</p>
        <div className="flex items-center gap-4 pt-3 border-t theme-border">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            <span className="theme-text-2 text-xs">Best: <span className="text-yellow-500 font-semibold">{longestStreak} days</span></span>
          </div>
          {lastLogDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 theme-text-3" />
              <span className="theme-text-3 text-xs">Last: {lastLogDate}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
