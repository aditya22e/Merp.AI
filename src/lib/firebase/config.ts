import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { FIREBASE_CONFIG } from '@/constants';

let firebaseApp: FirebaseApp;

try {
  if (!getApps().length) {
    firebaseApp = initializeApp(FIREBASE_CONFIG);
    console.log('Firebase initialized successfully:', firebaseApp.name);
  } else {
    firebaseApp = getApps()[0];
    console.log('Using existing Firebase app:', firebaseApp.name);
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error('Failed to initialize Firebase. Check environment variables in .env.local.');
}

export { firebaseApp };
