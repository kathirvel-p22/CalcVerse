const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-auto border-t border-gray-700 dark:border-gray-600 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">CalcVerse</h3>
          <p className="text-gray-300 dark:text-gray-400 mb-4">
            A comprehensive calculator and converter application with beautiful themes.
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
            <a href="/about" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="/themes" className="text-gray-400 hover:text-white transition-colors">
              Themes
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            &copy; 2025 CalcVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
