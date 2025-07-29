import { FeatureCardProps } from '../../types/home';

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="mt-3 text-gray-600 dark:text-gray-300 text-base leading-relaxed">{description}</p>
    </div>
  );
}
