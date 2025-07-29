'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Button from '../../../components/common/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEmailLogin = async () => {
    if (!validateForm()) return;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ ...errors, email: result.error });
      } else {
        window.location.href = '/';
      }
    } catch {
      setErrors({ ...errors, email: 'An error occurred. Please try again.' });
    }
  };

  const isButtonDisabled = !email || !password || !!errors.email || !!errors.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-16">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Sign In to AI Tutor
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2 mb-6">
          Access your notes and AI mentor
        </p>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <Button
            text="Sign in with Email"
            className={`w-full mt-2 ${
              isButtonDisabled
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={handleEmailLogin}
            disabled={isButtonDisabled}
          />

          <Button
            text="Sign in with Google"
            className="w-full mt-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
            onClick={() => signIn('google', { callbackUrl: '/notes' })}
          />
        </div>
      </div>
    </div>
  );
}
