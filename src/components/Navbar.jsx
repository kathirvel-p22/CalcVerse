import { Link } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            CalcVerse
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/themes"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors font-medium"
            >
              Themes
            </Link>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
