const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          About CalcVerse
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your comprehensive toolkit for calculations and conversions
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          What is CalcVerse?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          CalcVerse is a modern, web-based application that provides a comprehensive suite of calculators
          and converters. Whether you need to perform complex mathematical calculations, convert between
          different units, or analyze financial data, CalcVerse has you covered.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Features
        </h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
          <li>Wide range of calculators (Basic, Scientific, Age, BMI, EMI, Compound Interest, etc.)</li>
          <li>Unit converters (Currency, Time, Temperature, Data, Length/Weight)</li>
          <li>Interactive charts and visualizations</li>
          <li>Dark/Light theme support</li>
          <li>Offline functionality</li>
          <li>Calculation history storage</li>
          <li>Responsive design for all devices</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Technology Stack
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-semibold text-gray-800 dark:text-white">React</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Frontend</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-semibold text-gray-800 dark:text-white">Vite</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Build Tool</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-semibold text-gray-800 dark:text-white">Tailwind CSS</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Styling</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="font-semibold text-gray-800 dark:text-white">JavaScript</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Language</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Contact & Support
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Have questions or feedback? We'd love to hear from you. This application is open source
          and contributions are welcome on our GitHub repository.
        </p>
      </div>
    </div>
  );
};

export default About;
