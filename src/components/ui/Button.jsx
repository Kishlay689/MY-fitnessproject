// src/components/ui/Button.jsx — theme-aware secondary variant
const variants = {
  primary:   'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20',
  secondary: 'theme-elevated hover:opacity-80 theme-text-1 border theme-border',
  danger:    'bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400 border border-red-500/30',
  ghost:     'hover:theme-elevated theme-text-2',
  gradient:  'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white shadow-lg shadow-emerald-500/30',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', loading, disabled, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  );
}
