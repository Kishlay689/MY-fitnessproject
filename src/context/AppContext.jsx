// src/context/AppContext.jsx
// Global app state backed by localStorage — no Firebase
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { DEFAULT_TARGETS, calculateTargets } from '../data/nutrientTargets';
import {
  getProfile, saveProfile as storeSaveProfile,
  getNutritionLog, saveNutritionLog,
  getStreak, updateStreak as storeUpdateStreak,
} from '../storage';

const AppContext = createContext(null);
const todayStr = () => new Date().toISOString().split('T')[0];

const initialState = {
  profile: null,
  targets: DEFAULT_TARGETS,
  todayLog: { meals: [], date: todayStr() },
  streak: { currentStreak: 0, longestStreak: 0, lastLogDate: null },
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload, targets: calculateTargets(action.payload), loading: false };
    case 'SET_TODAY_LOG':
      return { ...state, todayLog: action.payload };
    case 'ADD_MEAL':
      return { ...state, todayLog: { ...state.todayLog, meals: [...state.todayLog.meals, action.payload] } };
    case 'REMOVE_MEAL':
      return { ...state, todayLog: { ...state.todayLog, meals: state.todayLog.meals.filter((_, i) => i !== action.payload) } };
    case 'SET_STREAK':
      return { ...state, streak: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount / user change
  useEffect(() => {
    if (!user) { dispatch({ type: 'SET_LOADING', payload: false }); return; }

    const profile = getProfile(user.uid);
    if (profile) {
      dispatch({ type: 'SET_PROFILE', payload: profile });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }

    const log = getNutritionLog(user.uid, todayStr());
    dispatch({ type: 'SET_TODAY_LOG', payload: log });

    const streak = getStreak(user.uid);
    dispatch({ type: 'SET_STREAK', payload: streak });
  }, [user]);

  const saveProfile = useCallback(async (profileData) => {
    if (!user) return;
    storeSaveProfile(user.uid, profileData);
    dispatch({ type: 'SET_PROFILE', payload: profileData });
  }, [user]);

  const addMeal = useCallback(async (meal) => {
    if (!user) return;
    const updatedMeals = [...state.todayLog.meals, meal];
    const updatedLog = { ...state.todayLog, meals: updatedMeals, date: todayStr() };
    dispatch({ type: 'ADD_MEAL', payload: meal });
    saveNutritionLog(user.uid, todayStr(), updatedLog);
    // Update streak
    const newStreak = storeUpdateStreak(user.uid);
    dispatch({ type: 'SET_STREAK', payload: newStreak });
  }, [user, state.todayLog]);

  const removeMeal = useCallback(async (index) => {
    if (!user) return;
    const updatedMeals = state.todayLog.meals.filter((_, i) => i !== index);
    const updatedLog = { ...state.todayLog, meals: updatedMeals };
    dispatch({ type: 'REMOVE_MEAL', payload: index });
    saveNutritionLog(user.uid, todayStr(), updatedLog);
  }, [user, state.todayLog]);

  const updateStreak = useCallback(async () => {
    if (!user) return;
    const newStreak = storeUpdateStreak(user.uid);
    dispatch({ type: 'SET_STREAK', payload: newStreak });
  }, [user]);

  // Compute today's totals
  const todayTotals = state.todayLog.meals.reduce(
    (acc, m) => ({
      calories: acc.calories + (m.calories || 0),
      protein:  acc.protein  + (m.protein  || 0),
      carbs:    acc.carbs    + (m.carbs     || 0),
      fat:      acc.fat      + (m.fat       || 0),
      fiber:    acc.fiber    + (m.fiber     || 0),
      calcium:  acc.calcium  + (m.calcium   || 0),
      iron:     acc.iron     + (m.iron      || 0),
      vitaminC: acc.vitaminC + (m.vitaminC  || 0),
      vitaminA: acc.vitaminA + (m.vitaminA  || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, calcium: 0, iron: 0, vitaminC: 0, vitaminA: 0 }
  );

  return (
    <AppContext.Provider value={{ ...state, todayTotals, saveProfile, addMeal, removeMeal, updateStreak }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
