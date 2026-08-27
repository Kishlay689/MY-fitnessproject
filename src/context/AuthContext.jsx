// src/context/AuthContext.jsx
// Local auth — no Firebase. User profile stored in localStorage.
import { createContext, useContext, useState, useEffect } from 'react';
import { getLocalUser, saveLocalUser, clearLocalUser, generateId } from '../storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = checking

  useEffect(() => {
    const stored = getLocalUser();
    setUser(stored || null);
  }, []);

  const signIn = (name) => {
    const existing = getLocalUser();
    const newUser = existing || {
      uid: generateId(),
      displayName: name,
      email: null,
      photoURL: null,
      createdAt: new Date().toISOString(),
    };
    if (name) newUser.displayName = name;
    saveLocalUser(newUser);
    setUser(newUser);
    return newUser;
  };

  const signOut = () => {
    clearLocalUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading: user === undefined, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
