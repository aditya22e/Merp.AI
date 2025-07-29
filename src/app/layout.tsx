import './global.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export const metadata = {
  title: 'Merp-AI',
  description: 'Learn with AI-powered notes and mentoring',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased transition-colors duration-300">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
