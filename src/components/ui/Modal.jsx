// src/components/ui/Modal.jsx — theme-aware
import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;
  const sizeMap = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative theme-card rounded-2xl shadow-2xl w-full ${sizeMap[size]} animate-fade-in max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b theme-border flex-shrink-0">
          <h2 className="text-lg font-semibold theme-text-1">{title}</h2>
          <button onClick={onClose} className="theme-text-2 hover:theme-text-1 transition-colors p-1 rounded-lg hover:theme-elevated">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
