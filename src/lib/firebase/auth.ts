import { getAuth, Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from './config';

const auth: Auth = getAuth(firebaseApp);

// placeholder function for email/password sign-up
async function signUpWithEmail(email: string, password: string): Promise<UserCredential | null> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up successfully:', userCredential.user.uid);
    return userCredential;
  } catch (error: any) {
    console.error('Error signing up:', error.code, error.message);
    if (error.code === 'auth/email-already-in-use') {
      console.warn('Email is already registered');
    }
    return null;
  }
}

// placeholder function for sign-in
async function signInWithEmail(email: string, password: string): Promise<UserCredential | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in successfully:', userCredential.user.uid);
    return userCredential;
  } catch (error: any) {
    console.error('Error signing in:', error.code, error.message);
    return null;
  }
}

// placeholder to get user ID
function getUserId(): string | null {
  const user = auth.currentUser;
  if (user) {
    console.log('Current user ID:', user.uid);
    return user.uid;
  }
  console.warn('No user is currently signed in');
  return null;
}

export { auth, signUpWithEmail, signInWithEmail, getUserId };