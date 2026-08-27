// src/App.jsx — with ThemeProvider
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ChatWidget from './components/chatbot/ChatWidget';
import LoadingSpinner from './components/ui/LoadingSpinner';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NutrientTracker from './pages/NutrientTracker';
import ExerciseRecommender from './pages/ExerciseRecommender';
import Profile from './pages/Profile';

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center theme-bg">
        <LoadingSpinner size="lg" text="Loading VitaTrack…" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <AppProvider>
      <div className="min-h-screen theme-bg transition-colors duration-300">
        <Navbar onMenuToggle={() => setMenuOpen(o => !o)} menuOpen={menuOpen} />
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="md:ml-64 pt-16 min-h-screen">
          <Outlet />
        </main>
        <ChatWidget />
      </div>
    </AppProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/nutrition" element={<NutrientTracker />} />
              <Route path="/exercise" element={<ExerciseRecommender />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
