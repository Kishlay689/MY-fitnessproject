// src/components/layout/Navbar.jsx — with dark/light toggle
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Activity, LogOut, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ onMenuToggle, menuOpen }) {
  const { user, signOut } = useAuth();
  const { streak } = useApp();
  const { isDark, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 theme-nav border-b theme-border h-16 transition-colors duration-300"
         style={{ boxShadow: 'var(--shadow-nav)' }}>
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">

        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuToggle}
            className="md:hidden theme-text-2 hover:theme-text-1 p-1">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold theme-text-1 text-lg hidden sm:block">VitaTrack</span>
          </Link>
        </div>

        {/* Right: streak + toggle + user */}
        <div className="flex items-center gap-2">

          {/* Streak badge */}
          {streak.currentStreak > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 rounded-full">
              <span className="text-base">🔥</span>
              <span className="text-orange-500 dark:text-orange-400 font-semibold text-sm">
                {streak.currentStreak} day streak
              </span>
            </div>
          )}

          {/* 🌙/☀️ Theme toggle */}
          <button
            onClick={toggle}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
              bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600
              text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User avatar + sign out */}
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {user.displayName?.[0]?.toUpperCase() || '?'}
              </div>
              <span className="theme-text-2 text-sm hidden sm:block">{user.displayName}</span>
              <button
                onClick={signOut}
                className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-500/10"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
