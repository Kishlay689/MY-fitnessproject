// src/pages/ExerciseRecommender.jsx — theme-aware
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { saveWorkoutLog } from '../storage';
import { generateLocalWorkout } from '../data/exerciseLibrary';
import GoalForm from '../components/exercise/GoalForm';
import WorkoutPlan from '../components/exercise/WorkoutPlan';
import Card from '../components/ui/Card';
import { Dumbbell, Sparkles } from 'lucide-react';

const today = () => new Date().toISOString().split('T')[0];

export default function ExerciseRecommender() {
  const { user } = useAuth();
  const { updateStreak } = useApp();

  const [form, setForm] = useState({ timeAvailable: '30', fitnessLevel: 'Beginner', goal: 'Weight Loss' });
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  const handleGenerate = () => {
    setLoading(true); setLogged(false);
    setTimeout(() => {
      setExercises(generateLocalWorkout(form));
      setLoading(false);
    }, 900);
  };

  const handleLogWorkout = async () => {
    if (!user || !exercises) return;
    saveWorkoutLog(user.uid, today(), {
      date: today(),
      exercises: exercises.map(e => ({ name: e.name, sets: e.sets, reps: e.reps, duration: e.duration })),
      totalDuration: exercises.reduce((s, e) => s + (e.duration || 0), 0),
      goal: form.goal, fitnessLevel: form.fitnessLevel,
      completedAt: new Date().toISOString(),
    });
    await updateStreak();
    setLogged(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold theme-text-1 flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-blue-500" /> Exercise Recommender
        </h1>
        <p className="theme-text-2 text-sm mt-1">Get a personalized workout plan instantly</p>
      </div>

      {!exercises ? (
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="font-semibold theme-text-1">Tell us about your workout</h2>
          </div>
          <GoalForm form={form} setForm={setForm} onGenerate={handleGenerate} loading={loading} />
        </Card>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold theme-text-1">Your {form.timeAvailable}-Minute Workout Plan</h2>
            <p className="theme-text-2 text-xs mt-0.5">{form.fitnessLevel} · {form.goal}</p>
          </div>
          {logged && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-emerald-600 dark:text-emerald-400 text-sm">
              ✅ Workout logged! Your streak has been updated. 🔥
            </div>
          )}
          <WorkoutPlan
            exercises={exercises}
            onReset={() => { setExercises(null); setLogged(false); }}
            onComplete={handleLogWorkout}
          />
        </div>
      )}
    </div>
  );
}
