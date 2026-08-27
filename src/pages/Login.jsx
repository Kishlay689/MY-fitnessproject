// src/pages/Login.jsx — theme-aware offline login
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, User, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const AVATARS = ['🧑', '👩', '👨', '🧒', '👴', '👵', '🧑‍💼', '👩‍💻', '🏃', '🧘'];

export default function Login() {
  const { user, signIn } = useAuth();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🧑');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleStart = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setTimeout(() => signIn(name.trim()), 500);
  };

  return (
    <div className="min-h-screen theme-bg flex items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-emerald-500/30">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold theme-text-1">VitaTrack</h1>
          <p className="theme-text-2 mt-1">Your AI Health Companion</p>
        </div>

        <div className="theme-card rounded-2xl p-8">
          <div className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm mb-6 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Works completely offline — no signup needed!
          </div>

          <h2 className="text-xl font-bold theme-text-1 text-center mb-6">Who are you?</h2>

          <div className="mb-5">
            <p className="theme-text-2 text-sm mb-2 text-center">Pick your avatar</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {AVATARS.map(a => (
                <button key={a} onClick={() => setAvatar(a)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                    avatar === a
                      ? 'bg-emerald-500/30 border-2 border-emerald-500 scale-110'
                      : 'theme-elevated border-2 theme-border hover:border-emerald-400'
                  }`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <label className="block text-sm font-medium theme-text-2 mb-2">Your Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text-3" />
                <input type="text" placeholder="e.g. Priya, Rahul, Arjun…" value={name}
                  onChange={e => setName(e.target.value)} required maxLength={30} autoFocus
                  className="w-full theme-input border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>
            </div>
            <Button type="submit" variant="gradient" size="lg" className="w-full" loading={loading} disabled={!name.trim()}>
              {avatar} Start My Health Journey →
            </Button>
          </form>
          <p className="theme-text-3 text-xs text-center mt-4">Your data stays on this device. No account required.</p>
        </div>
      </div>
    </div>
  );
}
