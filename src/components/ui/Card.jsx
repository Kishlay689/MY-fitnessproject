// src/components/ui/Card.jsx — theme-aware
export default function Card({ children, className = '', glass, ...props }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-colors duration-300 ${glass ? 'glass-card' : 'theme-card'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
