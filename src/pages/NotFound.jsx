import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="space-y-4">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Home
        </Link>
        <br />
        <Link
          to="/about"
          className="inline-block px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
