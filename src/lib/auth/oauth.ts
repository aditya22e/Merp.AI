import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { signInWithEmail } from '../firebase/auth';
import { firebaseApp } from '../firebase/config';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from '../../constants';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }
        const userCredential = await signInWithEmail(credentials.email, credentials.password);
        if (!userCredential) {
          throw new Error('Invalid credentials');
        }
        return {
          id: userCredential.user.uid,
          email: userCredential.user.email,
        };
      },
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === 'google' && account.id_token) {
        try {
          const credential = GoogleAuthProvider.credential(account.id_token);
          const auth = getAuth(firebaseApp);
          const userCredential = await signInWithCredential(auth, credential);
          console.log('Firebase Google sign-in:', userCredential.user.uid);
          return true;
        } catch (error: any) {
          console.error('Firebase sign-in error:', error.message);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      const auth = getAuth(firebaseApp);
      session.user.id = auth.currentUser?.uid || token.id || '';
      return session;
    },
  },
};

export default NextAuth(authOptions);