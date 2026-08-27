// src/gemini.js
// Gemini API client — wraps @google/generative-ai for easy use across the app
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;
let chatModel = null;

// Lazy-initialize so we don't crash when key is missing during dev
function getGenAI() {
  if (!genAI) {
    if (!apiKey || apiKey === 'your_gemini_api_key') {
      throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to .env.local');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Send a one-shot prompt to Gemini 1.5 Flash.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateText(prompt) {
  const client = getGenAI();
  if (!model) {
    model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * Create a new chat session with a system persona.
 * @param {string} systemPrompt
 * @returns {ChatSession}
 */
export function createChatSession(systemPrompt) {
  const client = getGenAI();
  if (!chatModel) {
    chatModel = client.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemPrompt,
    });
  }
  return chatModel.startChat({
    history: [],
    generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
  });
}

export const VITABOT_SYSTEM_PROMPT = `You are VitaBot, a friendly and knowledgeable health & fitness assistant for the VitaTrack app. 
Your role is to help users with:
- Nutrition questions (macros, calories, meal planning, Indian food)
- Exercise advice (form, routines, recovery, beginner tips)
- Health goal guidance (weight loss, muscle gain, stamina)
- App navigation ("how do I log food?", "where are my workouts?")

Keep responses concise (3-5 sentences max unless asked for detail). Be encouraging and non-judgmental. 
Use simple language. Add relevant emojis for warmth. Avoid medical diagnoses.
If given user context (today's calories, logged foods), reference them for personalized advice.`;
