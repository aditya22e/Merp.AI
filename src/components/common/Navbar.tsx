export default function Navbar() {
  return (
    <nav className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 backdrop-blur-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Merp.AI
        </a>
        <div className="flex items-center gap-6">
          <a
            href="/notes"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Notes
          </a>
          <a
  href="/auth/login"
  className="inline-block px-4 py-2 rounded-full border border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white transition-colors duration-300"
>
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
}
