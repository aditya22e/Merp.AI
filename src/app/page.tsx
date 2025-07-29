'use client';

import HeroSection from '../components/home/HeroSection';
import FeatureCard from '../components/home/FeatureCard';
import CallToAction from '../components/home/CallToAction';
import { useHome } from '../hooks/useHome';

export default function Home() {
  const { features } = useHome();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* Hero Section */}
        <section className="animate-fade-up">
          <HeroSection />
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>

        {/* CTA */}
        <section className="animate-fade-up">
          <CallToAction />
        </section>
      </div>
    </div>
  );
}
