const throwError = (key: string): never => {
  throw new Error(`Missing ${key} in .env.local`);
};

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || throwError('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || throwError('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || throwError('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || throwError('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || throwError('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || throwError('NEXT_PUBLIC_FIREBASE_APP_ID'),
}

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || throwError('GOOGLE_CLIENT_ID');
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || throwError('GOOGLE_CLIENT_SECRET');

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || throwError('GEMINI_API_KEY');

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || throwError('NEXTAUTH_SECRET');
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

console.log('Constants initialized successfully');