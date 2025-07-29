import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmail } from '../../../../../lib/firebase/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const userCredential = await signInWithEmail(email, password);
    if (!userCredential) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ userId: userCredential.user.uid }, { status: 200 });
  } catch (error: any) {
    console.error('Login error:', error.message);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}