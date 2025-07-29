import Button from '../common/Button';

export default function CallToAction() {
  return (
    <section className="py-16 text-center bg-gradient-to-br from-blue-50 via-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        Ready to Elevate Your Learning?
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        Start mastering your skills with Merp.AI from today.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Button
          href="/auth/register"
          text="Get Started"
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-xl shadow-md transition duration-300"
        />
        <Button
          href="/auth/login"
          text="Sign In"
          className="bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 px-6 py-3 rounded-xl transition duration-300"
        />
      </div>
    </section>
  );
}
