import { useState } from 'react';
import { FeatureCardProps } from '../types/home';

export function useHome() {
  const [features] = useState<FeatureCardProps[]>([
    { title: 'Interactive Notes', description: 'Build personalized notes with AI-generated questions for active learning.' },
    { title: 'AI Mentor', description: 'Receive personalized guidance from an AI-powered mentor.' },
    { title: 'Smart Quizzes', description: 'Test your knowledge with tailored, AI-driven quizzes.' },
  ]);
  return { features };
}