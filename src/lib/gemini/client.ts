import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../../constants';

let genAI: GoogleGenerativeAI;

try {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  console.log('Gemini API client initialized successfully');
} catch (error: any) {
  console.error('Error initializing Gemini API client:', {
    message: error.message,
    code: error.code || 'UNKNOWN',
  });
  throw new Error('Failed to initialize Gemini API client. Check GEMINI_API_KEY in .env.local.');
}

export { genAI };