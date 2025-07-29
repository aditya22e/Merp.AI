'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../../../lib/firebase/config';
import { Hammer, BookOpen } from 'lucide-react';

export default function Onboarding() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
        Are you here to <span className="text-blue-600">Build</span> or <span className="text-green-500">Learn</span>?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Build Card */}
        <div
          onClick={() => router.push('/chat/mentor?mode=build')}
          className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 text-center"
        >
          <Hammer className="mx-auto text-blue-600 mb-3" size={36} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">I want to Build</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Get coding help and guidance to bring your ideas to life.</p>
        </div>

        {/* Learn Card */}
        <div
          onClick={() => router.push('/chat/mentor?mode=learn')}
          className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 text-center"
        >
          <BookOpen className="mx-auto text-green-500 mb-3" size={36} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">I want to Learn</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Master concepts, solve doubts, and learn interactively.</p>
        </div>
      </div>
    </div>
  );
}
