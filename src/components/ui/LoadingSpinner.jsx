// src/components/ui/LoadingSpinner.jsx
export default function LoadingSpinner({ size = 'md', text }) {
  const s = { sm: 'h-5 w-5', md: 'h-10 w-10', lg: 'h-16 w-16' };
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${s[size]} animate-spin rounded-full border-4 border-slate-600 border-t-emerald-500`} />
      {text && <p className="text-slate-400 text-sm">{text}</p>}
    </div>
  );
}
