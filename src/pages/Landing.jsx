// src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { Activity, Salad, Dumbbell, MessageCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';

const FEATURES = [
  { icon: Salad, title: 'Smart Nutrition Tracking', desc: 'Log meals from 200+ Indian foods. Track calories, protein, carbs, fat, fiber and key micronutrients daily.', color: 'from-emerald-500 to-teal-400' },
  { icon: Dumbbell, title: 'AI Exercise Recommender', desc: 'Get a personalized workout plan based on your time, fitness level and goal — powered by Gemini AI.', color: 'from-blue-500 to-cyan-400' },
  { icon: MessageCircle, title: 'VitaBot AI Assistant', desc: 'Ask anything about nutrition or fitness. VitaBot gives personalized, context-aware answers using your actual data.', color: 'from-purple-500 to-pink-400' },
  { icon: Zap, title: 'Streak & Reminders', desc: 'Daily reminders, streak tracking, and motivational nudges keep you consistently on track every single day.', color: 'from-orange-500 to-amber-400' },
];

const STATS = [
  { value: '200+', label: 'Indian Foods' },
  { value: '30+', label: 'Exercises' },
  { value: 'AI', label: 'Powered Chatbot' },
  { value: '∞', label: 'Day Streaks' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">VitaTrack</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login"><Button variant="ghost" size="md">Sign In</Button></Link>
          <Link to="/login"><Button variant="gradient" size="md">Get Started Free</Button></Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-24 text-center max-w-5xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm mb-8">
            <Zap className="w-4 h-4" /> Smart India Hackathon 2024 Project
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Your AI-Powered<br />
            <span className="gradient-text">Health Companion</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Track nutrition, get personalized workouts, and chat with an AI health assistant —
            all in one place. Built for India, by India. 🇮🇳
          </p>
          <Link to="/login">
            <Button variant="gradient" size="xl">Start Your Health Journey →</Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold gradient-text">{value}</div>
              <div className="text-slate-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to stay <span className="gradient-text">healthy</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass-card rounded-2xl p-6 hover:border-slate-600/80 transition-all duration-300 group">
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-12">
          <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to transform your health?</h2>
          <p className="text-slate-400 mb-8">Join VitaTrack and start your wellness journey today. Completely free.</p>
          <Link to="/login">
            <Button variant="gradient" size="xl">Get Started — It's Free</Button>
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-slate-600 border-t border-slate-800 text-sm">
        VitaTrack — Smart India Hackathon 2024 | Built with ❤️ for India's health
      </footer>
    </div>
  );
}
