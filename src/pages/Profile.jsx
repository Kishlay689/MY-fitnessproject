// src/pages/Profile.jsx — offline version
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { User, Target, Save } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Profile() {
  const { user } = useAuth();
  const { profile, saveProfile, streak, targets } = useApp();
  const [form, setForm] = useState({
    name: '', age: 25, weight: 65, height: 165,
    gender: 'male', activityLevel: 'moderate', goal: 'General Fitness'
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
    else if (user) setForm(f => ({ ...f, name: user.displayName || '' }));
  }, [profile, user]);

  const handleSave = async () => {
    setLoading(true);
    await saveProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setLoading(false);
  };

  const Field = ({ label, fieldKey, type = 'text', options }) => (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>
      {options ? (
        <select value={form[fieldKey]} onChange={e => setForm(f => ({ ...f, [fieldKey]: e.target.value }))}
          className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500">
          {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      ) : (
        <input type={type} value={form[fieldKey]}
          onChange={e => setForm(f => ({ ...f, [fieldKey]: type === 'number' ? Number(e.target.value) : e.target.value }))}
          className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500" />
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile & Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Targets calculated using ICMR-NIN 2020 guidelines · All data stored locally</p>
      </div>

      {/* Avatar */}
      <Card className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-3xl flex-shrink-0">
          {user?.displayName?.[0]?.toUpperCase() || '🧑'}
        </div>
        <div>
          <h2 className="text-white font-semibold text-lg">{user?.displayName}</h2>
          <p className="text-slate-400 text-sm">Local account · data on this device</p>
        </div>
      </Card>

      {/* Streak stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center">
          <div className="text-3xl mb-1">🔥</div>
          <div className="text-2xl font-bold text-orange-400">{streak.currentStreak}</div>
          <div className="text-slate-400 text-sm">Current Streak</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl mb-1">🏆</div>
          <div className="text-2xl font-bold text-yellow-400">{streak.longestStreak}</div>
          <div className="text-slate-400 text-sm">Best Streak</div>
        </Card>
      </div>

      {/* Form */}
      <Card>
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><User className="w-4 h-4" /> Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" fieldKey="name" />
          <Field label="Age" fieldKey="age" type="number" />
          <Field label="Weight (kg)" fieldKey="weight" type="number" />
          <Field label="Height (cm)" fieldKey="height" type="number" />
          <Field label="Gender" fieldKey="gender" options={[
            { v: 'male', l: 'Male' }, { v: 'female', l: 'Female' }, { v: 'other', l: 'Other' }
          ]} />
          <Field label="Activity Level" fieldKey="activityLevel" options={[
            { v: 'sedentary', l: 'Sedentary (desk job)' },
            { v: 'light', l: 'Light (1-3 days/week)' },
            { v: 'moderate', l: 'Moderate (3-5 days/week)' },
            { v: 'active', l: 'Active (6-7 days/week)' },
            { v: 'veryActive', l: 'Very Active (athlete)' },
          ]} />
          <Field label="Health Goal" fieldKey="goal" options={[
            { v: 'Weight Loss', l: 'Weight Loss' },
            { v: 'Muscle Gain', l: 'Muscle Gain' },
            { v: 'Flexibility', l: 'Flexibility & Wellness' },
            { v: 'Endurance', l: 'Endurance & Stamina' },
            { v: 'General Fitness', l: 'General Fitness' },
          ]} />
        </div>
      </Card>

      {/* Calculated targets */}
      <Card>
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Target className="w-4 h-4" /> Daily Targets</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Calories', val: targets.calories, unit: 'kcal', color: 'text-orange-400' },
            { label: 'Protein', val: targets.protein, unit: 'g', color: 'text-blue-400' },
            { label: 'Carbs', val: targets.carbs, unit: 'g', color: 'text-yellow-400' },
            { label: 'Fat', val: targets.fat, unit: 'g', color: 'text-purple-400' },
            { label: 'Fiber', val: targets.fiber, unit: 'g', color: 'text-green-400' },
            { label: 'Calcium', val: targets.calcium, unit: 'mg', color: 'text-cyan-400' },
          ].map(({ label, val, unit, color }) => (
            <div key={label} className="bg-slate-900/50 rounded-xl p-3 text-center">
              <div className={`text-lg font-bold ${color}`}>{val}</div>
              <div className="text-slate-500 text-xs">{unit}</div>
              <div className="text-slate-400 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </Card>

      <Button variant="gradient" size="lg" onClick={handleSave} loading={loading} className="w-full">
        {saved ? '✓ Saved!' : <><Save className="w-4 h-4" /> Save Profile</>}
      </Button>
    </div>
  );
}
