// src/components/chatbot/ChatWindow.jsx — theme-aware
import { useState, useEffect, useRef } from 'react';
import { Send, X, Maximize2, Minimize2 } from 'lucide-react';
import { getLocalResponse, buildContext } from '../../localChatbot';
import { useApp } from '../../context/AppContext';
import ChatMessage from './ChatMessage';

const QUICK_PROMPTS = [
  "What should I eat for dinner? 🍛",
  "How much protein do I need? 💪",
  "Give me weight loss tips 🔥",
  "What are healthy Indian snacks? 🥜",
];

export default function ChatWindow({ onClose }) {
  const { todayTotals, targets, streak } = useApp();
  const [messages, setMessages] = useState([{
    id: 0, role: 'bot',
    content: "Hi! I'm VitaBot 🌿 Your personal health assistant.\n\nI can help with nutrition advice, workout tips, Indian food guidance, and more!\n\nWhat's on your mind?",
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput('');
    setMessages(prev => [...prev,
      { id: Date.now(), role: 'user', content: userText },
      { id: Date.now() + 1, role: 'bot', content: '', loading: true },
    ]);
    setLoading(true);
    setTimeout(() => {
      const ctx = buildContext(todayTotals, targets, streak);
      const response = getLocalResponse(userText, ctx);
      setMessages(prev => prev.map(m => m.loading ? { ...m, content: response, loading: false } : m));
      setLoading(false);
      inputRef.current?.focus();
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className={`flex flex-col theme-card rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
      expanded ? 'fixed inset-4 z-50' : 'h-[500px] w-[360px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 theme-elevated border-b theme-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-sm">🌿</div>
          <div>
            <p className="theme-text-1 text-sm font-semibold">VitaBot</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="theme-text-3 text-xs">Health Assistant • Offline</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setExpanded(e => !e)} className="theme-text-2 hover:theme-text-1 p-1.5 rounded-lg hover:theme-elevated transition-colors">
            {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={onClose} className="theme-text-2 hover:theme-text-1 p-1.5 rounded-lg hover:theme-elevated transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map(p => (
            <button key={p} onClick={() => sendMessage(p)}
              className="text-xs theme-elevated hover:bg-emerald-500/10 theme-text-2 border theme-border px-3 py-1.5 rounded-full transition-colors">
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-end gap-2 p-3 border-t theme-border flex-shrink-0">
        <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Ask VitaBot anything…" rows={1}
          className="flex-1 theme-input border rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-emerald-500 transition-colors"
          style={{ maxHeight: '80px' }} />
        <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
          className="w-9 h-9 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
