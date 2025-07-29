import Button from "../common/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br mask-radial-from-blue-400 via-blue-300 to-blue-500 dark:from-blue-600 dark:to-blue-400 py-24 px-6 text-center rounded-4xl border-gray-200 dark:border-blue-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight animate-fade-up">
          Merp.AI: <span className="text-blue-600 dark:text-blue-400">Your Growing Companion</span>
        </h1>
        <p className="mt-6 text-2xl font-bold md:text-4xl text-black dark:text-black max-w-2xl mx-auto">
          PRECISE. PERSONALIZED. DYNAMIC
        </p>
        <Button
        href="/dashboard/onboarding"
        text="Start a New Project"
        className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 my-4 rounded-lg text-lg font-medium"
      />
      </div>
    </section>
  );
}
