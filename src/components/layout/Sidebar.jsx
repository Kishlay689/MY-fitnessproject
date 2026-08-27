// src/components/layout/Sidebar.jsx — theme-aware
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Salad, Dumbbell, User } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/nutrition',  icon: Salad,           label: 'Nutrition'  },
  { to: '/exercise',  icon: Dumbbell,         label: 'Exercise'   },
  { to: '/profile',   icon: User,             label: 'Profile'    },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 dark:bg-black/50 md:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed left-0 top-16 bottom-0 z-30 w-64 flex flex-col pt-4 pb-6
        theme-sidebar border-r theme-border
        transition-all duration-300
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                ${isActive
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'theme-text-2 hover:theme-elevated hover:theme-text-1'}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mt-auto">
          <p className="text-xs theme-text-3 text-center">VitaTrack © SIH 2024</p>
        </div>
      </aside>
    </>
  );
}
