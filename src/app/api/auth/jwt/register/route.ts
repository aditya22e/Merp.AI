import { NextRequest, NextResponse } from 'next/server';
import { signUpWithEmail } from '../../../../../lib/firebase/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    if (!/\d/.test(password)) {
      return NextResponse.json({ error: 'Password must contain at least one number' }, { status: 400 });
    }

    const userCredential = await signUpWithEmail(email, password);
    if (!userCredential) {
      return NextResponse.json({ error: 'Registration failed. Email may be in use.' }, { status: 400 });
    }

    return NextResponse.json({ userId: userCredential.user.uid }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error.message);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}