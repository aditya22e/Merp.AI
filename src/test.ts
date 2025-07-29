import { firebaseApp } from './lib/firebase/config';
import { auth, getUserId } from './lib/firebase/auth';
import { genAI } from './lib/gemini/client';

console.log('Testing Firebase Config:', firebaseApp.name, firebaseApp);
console.log('Testing Firebase Auth:', auth);
console.log('Testing Gemini Client:', genAI);
console.log('Testing getUserId:', getUserId());