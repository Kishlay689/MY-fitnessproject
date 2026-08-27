// src/localChatbot.js
// Rule-based chatbot engine — no API key needed, works 100% offline
// Responds to 40+ health/fitness intents with personalized context

// ─── Intent patterns ────────────────────────────────────────
const INTENTS = [
  // Greetings
  {
    patterns: ['hi', 'hello', 'hey', 'namaste', 'hii', 'sup'],
    responses: [
      "Hi there! 😊 I'm VitaBot, your health assistant. Ask me anything about nutrition, workouts, or your progress!",
      "Hello! 🌿 Ready to help you with your health goals today. What's on your mind?",
      "Hey! Great to see you! 💪 How can I help you stay healthy today?",
    ],
  },
  // Calories
  {
    patterns: ['how many calories', 'calorie', 'kcal', 'calories today', 'calories left'],
    responses: (ctx) => [
      `You've had **${ctx.calories} kcal** today out of your **${ctx.targetCalories} kcal** goal. ${ctx.caloriesLeft > 0 ? `You have **${ctx.caloriesLeft} kcal** remaining — great progress! 🔥` : `You've hit your calorie goal for today! 🎉 Stay hydrated!`}`,
      `Today's count: **${ctx.calories}/${ctx.targetCalories} kcal**. ${ctx.caloriesLeft > 0 ? `Keep going — ${ctx.caloriesLeft} kcal to go!` : `Goal achieved! Rest and recover well tonight. 🌙`}`,
    ],
  },
  // Protein
  {
    patterns: ['protein', 'how much protein', 'need protein', 'protein intake', 'protein today'],
    responses: (ctx) => [
      `You've consumed **${ctx.protein}g** of protein today (target: **${ctx.targetProtein}g**). ${ctx.protein < ctx.targetProtein ? `Try adding dal, paneer, eggs, or chicken to hit your target! 💪` : `Excellent — protein goal crushed! 🏆`}`,
      `Protein status: **${ctx.protein}g / ${ctx.targetProtein}g** 🥩\n\nTop Indian protein sources: Paneer (18g/100g), Moong dal (7g/100g), Chicken breast (31g/100g), Eggs (13g each), Soya chunks (10g/100g cooked).`,
      `General rule: aim for **0.8–1.2g of protein per kg of body weight** daily. For muscle gain, go up to **1.6–2.2g/kg**. Your target is **${ctx.targetProtein}g**. 🏋️`,
    ],
  },
  // Weight loss
  {
    patterns: ['lose weight', 'weight loss', 'fat loss', 'reduce weight', 'slim', 'lose fat', 'belly fat'],
    responses: [
      "For weight loss, focus on a **300-500 kcal deficit** per day — not more! 🥗\n\n✅ Eat more protein & fiber\n✅ Drink 2-3L water daily\n✅ Sleep 7-8 hours\n✅ Walk 8,000 steps\n❌ Avoid crash diets — they backfire!",
      "Sustainable weight loss = **0.5–1 kg per week**. Here's what works:\n\n• Swap maida for whole wheat atta\n• Add sabzi at every meal\n• Replace chips with makhana or peanuts\n• Morning walk + evening exercise 💪",
      "The best fat-burning exercises are: **HIIT, jump squats, burpees, cycling, and swimming**. Combine with a slight calorie deficit and you'll see results in 3-4 weeks! 🔥",
    ],
  },
  // Muscle gain
  {
    patterns: ['muscle', 'muscle gain', 'bulk', 'build muscle', 'gain weight', 'strength'],
    responses: [
      "To build muscle, you need:\n\n1. **Calorie surplus** (+200-300 kcal/day)\n2. **High protein** (1.6-2.2g per kg bodyweight)\n3. **Progressive overload** in training\n4. **Quality sleep** (muscle grows at night! 🌙)\n\nFocus on compound exercises: squats, push-ups, pull-ups, lunges.",
      "Best Indian foods for muscle gain:\n\n🥩 Paneer — 18g protein/100g\n🫘 Soya chunks — 10g protein/100g cooked\n🥚 Eggs — 13g protein each\n🥛 Greek yogurt — 10g protein/100g\n🐓 Chicken breast — 31g protein/100g",
    ],
  },
  // Breakfast
  {
    patterns: ['breakfast', 'morning meal', 'what to eat morning', 'morning food'],
    responses: [
      "Great Indian breakfast ideas 🌅\n\n• **Poha + peanuts** — light, fiber-rich\n• **Moong dal chilla** — high protein\n• **Oats with fruits** — good carbs + fiber\n• **Egg + whole wheat toast** — protein-packed\n• **Idli + sambhar** — low calorie, nutritious\n\nEat within 1 hour of waking for best metabolism!",
      "For a power breakfast, aim for: **30-35g carbs + 20g protein + fiber**. \n\nTry: 2 eggs + 2 rotis + cucumber = ~400 kcal and keeps you full till lunch! 💪",
    ],
  },
  // Lunch
  {
    patterns: ['lunch', 'afternoon meal', 'what to eat lunch', 'midday meal'],
    responses: [
      "Ideal Indian lunch 🍛\n\n• **Dal + rice/roti + sabzi + curd** = complete nutrition!\n• Protein from dal, carbs from rice/roti, fiber from sabzi\n• Add a salad on the side for micronutrients\n\nLunch should be your biggest meal of the day — aim for 35-40% of daily calories.",
      "Quick healthy lunch options:\n\n🫘 Rajma chawal + salad\n🌿 Palak paneer + 2 rotis\n🍗 Chicken curry + brown rice\n🥗 Sprouts salad + curd rice\n\nAvoid heavy fried foods at lunch — they cause afternoon energy crashes! 😴",
    ],
  },
  // Dinner
  {
    patterns: ['dinner', 'evening meal', 'what to eat dinner', 'night meal', 'what should i eat tonight'],
    responses: (ctx) => [
      `You've had **${ctx.calories} kcal** so far today with **${ctx.caloriesLeft}** remaining. For dinner, aim for **${Math.min(600, Math.max(300, ctx.caloriesLeft))} kcal**.\n\n🌙 Light dinner ideas:\n• Moong dal khichdi\n• Vegetable soup + 1 roti\n• Grilled fish/chicken + salad\n• Curd rice + sabzi\n\nEat at least 2 hours before sleeping!`,
      "Best dinner principles:\n\n✅ Keep it light — 20-25% of daily calories\n✅ High protein to aid overnight muscle repair\n✅ Low refined carbs at night\n✅ Done eating by 8 PM ideally\n\n🍲 Try: Dal + 1 roti + sabzi + buttermilk",
    ],
  },
  // Snacks
  {
    patterns: ['snack', 'snacks', 'healthy snack', 'evening snack', 'hunger', 'feeling hungry'],
    responses: [
      "Healthy Indian snack ideas 🍎\n\n• **Makhana** (foxnuts) — 347 kcal/100g, high protein\n• **Roasted chana** — protein-packed\n• **Fruit chaat** — vitamins + natural sugars\n• **Sprouts salad** — fiber + protein\n• **Greek yogurt** — probiotics + protein\n\nAvoid: chips, biscuits, namkeen — empty calories!",
      "Pre-workout snack (30 min before): Banana + peanut butter 🍌\nPost-workout snack (within 30 min): Protein shake or Greek yogurt 🥛\nEvening hunger: Handful of almonds + one fruit 🌰",
    ],
  },
  // Water
  {
    patterns: ['water', 'hydration', 'how much water', 'drink water'],
    responses: [
      "Hydration guide 💧\n\n• **Minimum**: 8 glasses (2L) per day\n• **Active days**: 3-4L\n• **Signal**: urine should be pale yellow\n\nTips:\n✅ Start morning with 2 glasses\n✅ Drink before meals (reduces overeating)\n✅ Coconut water is great for electrolytes\n❌ Don't count tea/coffee as water",
    ],
  },
  // Sleep
  {
    patterns: ['sleep', 'not sleeping', 'insomnia', 'tired', 'fatigue', 'rest'],
    responses: [
      "Sleep is when your body repairs and grows! 😴\n\n**Tips for better sleep:**\n• No screens 30 min before bed\n• Eat dinner 2+ hours before sleep\n• Try warm milk with turmeric (haldi doodh) 🥛\n• Keep same wake time every day\n• 7-9 hours is ideal for adults\n\nPoor sleep → increased hunger + weight gain!",
      "Sleep affects everything — metabolism, muscle growth, mood, immunity. 🌙\n\nEat foods rich in **tryptophan** for better sleep: milk, curd, banana, nuts, dal.",
    ],
  },
  // Exercise / workout
  {
    patterns: ['workout', 'exercise', 'gym', 'training', 'what exercise', 'should i workout'],
    responses: [
      "Go to the **Exercise tab** in the app and I'll generate a personalized workout plan for you! 💪\n\nJust tell it your:\n• Time available (15-60 min)\n• Fitness level\n• Goal (weight loss, muscle, flexibility)\n\nIt creates a complete plan with instructions!",
      "General fitness rule: **150 minutes of moderate exercise per week** (WHO recommendation).\n\nThat's just **30 min × 5 days**! Great options:\n🏃 Brisk walking\n🧘 Yoga / Surya Namaskar\n💪 Bodyweight exercises\n🚴 Cycling",
    ],
  },
  // Fiber
  {
    patterns: ['fiber', 'fibre', 'digestion', 'constipation', 'gut health'],
    responses: [
      "Fiber keeps your gut healthy and controls hunger! 🥦\n\n**Daily target**: 25-30g\n\nTop Indian fiber sources:\n• Rajma — 6.4g/100g ✨\n• Guava — 5.4g/100g\n• Whole wheat roti — 2.9g each\n• Chana — 7.6g/100g\n• Broccoli — 3.3g/100g\n\nIncrease fiber slowly — sudden changes cause bloating!",
    ],
  },
  // Vitamins
  {
    patterns: ['vitamin', 'vitamins', 'vitamin c', 'vitamin d', 'vitamin b12', 'deficiency'],
    responses: [
      "Common deficiencies in India 🇮🇳\n\n**Vitamin D** — Get 20 min of morning sunlight + eat eggs, fatty fish\n**Vitamin B12** — Common in vegetarians; eat dairy, eggs, or take supplements\n**Iron** — Add spinach, rajma, dark chocolate; eat with Vitamin C to absorb better\n**Vitamin C** — Guava (228mg!), oranges, amla, bell peppers",
      "Amla (Indian gooseberry) has **600-700mg Vitamin C per 100g** — that's 10× an orange! 🍋\n\nTry amla pickle, amla juice, or raw amla for an immunity boost.",
    ],
  },
  // Indian food specific
  {
    patterns: ['dal', 'daal', 'lentil'],
    responses: [
      "Dal is a superfood! 🫘\n\n• High protein (6-10g per serving)\n• Rich in fiber, iron, folate\n• Low fat, low glycemic index\n• Cheap and easy to make!\n\nBest dals for protein: Moong dal, Masoor dal, Chana dal. Eat daily!",
    ],
  },
  {
    patterns: ['paneer', 'cottage cheese'],
    responses: [
      "Paneer is excellent for vegetarians! 🧀\n\n• **18g protein / 100g** — highest among Indian dairy\n• Rich in calcium (480mg/100g)\n• But also high in fat (21g/100g) — watch portions!\n\nBest ways: Grilled paneer, palak paneer, paneer bhurji (skip the oil!). Aim for 100-150g per serving.",
    ],
  },
  // Streak
  {
    patterns: ['streak', 'my streak', 'how many days', 'consistency'],
    responses: (ctx) => [
      ctx.streak > 0
        ? `You're on a **${ctx.streak}-day streak** — keep it up! 🔥🔥\n\nConsistency is the #1 factor in health improvement. Studies show **21 days** forms a habit. You're building something amazing!`
        : `Start your streak today! Log your first meal and it begins. 🌱\n\nEven ONE logged meal per day counts. Small actions → big results over time!`,
    ],
  },
  // Weight
  {
    patterns: ['bmi', 'body mass', 'ideal weight', 'overweight', 'underweight'],
    responses: [
      "BMI Calculator:\n\n**Formula**: Weight (kg) ÷ Height² (m)\n\n📊 Categories:\n• < 18.5 → Underweight\n• 18.5-24.9 → Normal ✅\n• 25-29.9 → Overweight\n• ≥ 30 → Obese\n\n*Note: BMI doesn't account for muscle mass. A muscular person can have high BMI but be very healthy!*",
    ],
  },
  // Thanks
  {
    patterns: ['thank', 'thanks', 'thank you', 'helpful', 'great', 'awesome', 'nice'],
    responses: [
      "Happy to help! 😊 Keep up the great work on your health journey! 💪",
      "You're welcome! 🌿 Remember: small consistent steps lead to big results. Keep logging!",
      "Glad I could help! 🙏 Is there anything else you'd like to know about nutrition or fitness?",
    ],
  },
  // Navigation help
  {
    patterns: ['how to log', 'add food', 'log meal', 'log food', 'track meal'],
    responses: [
      "To log food:\n\n1. Tap **Nutrition** in the sidebar\n2. Click **'Add Food'** button (top right)\n3. Search for any food (e.g. 'dal', 'roti', 'banana')\n4. Set portion size in grams\n5. Choose meal type (Breakfast/Lunch/Dinner/Snacks)\n6. Click **'Add to Log'** ✅\n\nYour macros update instantly!",
    ],
  },
  {
    patterns: ['how to use', 'help', 'what can you do', 'features', 'guide'],
    responses: [
      "VitaTrack features 🌿\n\n📊 **Nutrition Tracker** — Log meals from 75+ Indian foods\n💪 **Exercise Recommender** — AI-generated workout plans\n🔥 **Streak Tracker** — Track consistency\n📈 **Weekly Charts** — See your progress\n👤 **Profile** — Set personalized targets\n\nAsk me anything about health, food, or fitness!",
    ],
  },
  // Yoga
  {
    patterns: ['yoga', 'flexibility', 'stretching', 'surya namaskar'],
    responses: [
      "Yoga is incredible for overall health! 🧘\n\n**Surya Namaskar** (Sun Salutation):\n• Burns ~140 kcal per 12-round set\n• Improves flexibility, strength, and balance\n• Best done at sunrise on empty stomach\n• Start with 5 rounds, build to 12\n\nTry the Exercise tab → select 'Flexibility' goal for a full yoga routine!",
    ],
  },
];

// ─── Random pick ────────────────────────────────────────────
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Build context from user data ────────────────────────────
export function buildContext(todayTotals, targets, streak) {
  const caloriesLeft = Math.max(0, targets.calories - Math.round(todayTotals.calories));
  return {
    calories: Math.round(todayTotals.calories),
    protein: Math.round(todayTotals.protein),
    targetCalories: targets.calories,
    targetProtein: targets.protein,
    caloriesLeft,
    streak: streak?.currentStreak || 0,
  };
}

// ─── Main response function ───────────────────────────────────
export function getLocalResponse(message, ctx) {
  const msg = message.toLowerCase().trim();

  for (const intent of INTENTS) {
    const matched = intent.patterns.some(p => msg.includes(p));
    if (matched) {
      const responses = typeof intent.responses === 'function'
        ? intent.responses(ctx)
        : intent.responses;
      return pick(responses);
    }
  }

  // Default fallback responses
  const defaults = [
    `Good question! 🤔 For personalized advice, make sure you've set up your profile with your weight, height, and goals.\n\nI can help with: **nutrition tips, workout advice, meal planning, healthy Indian foods, weight management, sleep, hydration**, and more. Just ask!`,
    `I'm not sure about that specific question, but here's a universal health tip:\n\n🌿 **Eat real food, move every day, sleep well, drink water.**\n\nWhat else can I help with? Try asking: "What should I eat for dinner?" or "How much protein do I need?"`,
    `Hmm, let me think… 🤔\n\nHere's something useful: **80% of health results come from diet, 20% from exercise**. So what you eat matters most!\n\nAsk me about specific foods, workouts, or your nutrition goals!`,
  ];

  return pick(defaults);
}
