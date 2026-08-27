// src/components/chatbot/ChatWidget.jsx
// Floating chat bubble that opens ChatWindow
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? 'bg-slate-700 hover:bg-slate-600'
            : 'bg-gradient-to-br from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 shadow-emerald-500/40'
        }`}
        title={open ? 'Close VitaBot' : 'Chat with VitaBot'}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Tooltip when closed */}
      {!open && (
        <div className="absolute bottom-16 right-0 bg-slate-800 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 pointer-events-none transition-opacity">
          Chat with VitaBot 🌿
        </div>
      )}
    </div>
  );
}
