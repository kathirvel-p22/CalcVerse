import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const Themes = () => {
  const {
    theme,
    themes,
    setLightTheme,
    setDarkTheme,
    setBlueTheme,
    setGreenTheme,
    setPurpleTheme,
    setOrangeTheme,
    setPinkTheme,
    setTealTheme
  } = useTheme();

  const [previewTheme, setPreviewTheme] = useState(null);

  const themeActions = {
    light: setLightTheme,
    dark: setDarkTheme,
    blue: setBlueTheme,
    green: setGreenTheme,
    purple: setPurpleTheme,
    orange: setOrangeTheme,
    pink: setPinkTheme,
    teal: setTealTheme
  };

  const handleThemeSelect = (themeKey) => {
    themeActions[themeKey]();
  };

  const ThemePreview = ({ themeKey, themeData, isActive }) => (
    <div
      className={`relative rounded-xl border-4 transition-all duration-300 cursor-pointer ${
        isActive ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'
      } ${themeData.bg} overflow-hidden`}
      onClick={() => handleThemeSelect(themeKey)}
      onMouseEnter={() => setPreviewTheme(themeKey)}
      onMouseLeave={() => setPreviewTheme(null)}
    >
      {/* Theme Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{themeData.icon}</span>
            <div>
              <h3 className={`text-xl font-bold ${themeData.text}`}>{themeData.name}</h3>
              <p className={`text-sm ${themeData.text} opacity-75`}>
                {isActive ? 'Currently Active' : 'Click to Apply'}
              </p>
            </div>
          </div>
          {isActive && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Active
            </div>
          )}
        </div>
      </div>

      {/* Theme Content Preview */}
      <div className="p-6">
        {/* Sample Card */}
        <div className={`rounded-lg p-4 mb-4 ${themeData.card} border ${themeData.border}`}>
          <h4 className={`font-semibold mb-2 ${themeData.text}`}>Sample Calculator</h4>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[7, 8, 9, '÷', 4, 5, 6, '×', 1, 2, 3, '-', 0, '.', '=', '+'].map((btn, idx) => (
              <button
                key={idx}
                className={`p-2 rounded text-sm font-medium ${
                  typeof btn === 'number' || btn === '.' || btn === '='
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className={`text-right text-2xl font-bold ${themeData.text}`}>123.45</div>
        </div>

        {/* Sample Text */}
        <div className="space-y-2">
          <p className={`text-sm ${themeData.text}`}>
            Experience the {themeData.name.toLowerCase()} theme with its unique color palette and visual style.
          </p>
          <div className="flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${themeData.card} ${themeData.text} border ${themeData.border}`}>
              Calculator
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${themeData.card} ${themeData.text} border ${themeData.border}`}>
              Converter
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${themeData.card} ${themeData.text} border ${themeData.border}`}>
              Theme
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      {previewTheme === themeKey && !isActive && (
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
            <span className="text-sm font-medium text-gray-800">Click to apply this theme</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 theme-gallery">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Theme Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our collection of beautiful themes to customize your CalcVerse experience.
            Each theme is designed for optimal readability and visual appeal.
          </p>
        </div>

        {/* Current Theme Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{themes[theme].icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Current Theme: {themes[theme].name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  This theme is currently applied to your entire application
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Theme ID</div>
              <div className="font-mono text-lg font-bold text-gray-800 dark:text-white">{theme}</div>
            </div>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(themes).map(([themeKey, themeData]) => (
            <ThemePreview
              key={themeKey}
              themeKey={themeKey}
              themeData={themeData}
              isActive={theme === themeKey}
            />
          ))}
        </div>

        {/* Theme Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Theme Benefits */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              🎨 Theme Benefits
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Eye Comfort</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Carefully selected colors to reduce eye strain during long usage
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Accessibility</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    High contrast ratios for better readability for all users
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Personalization</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Express your style with themes that match your personality
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-lg">
                  <span className="text-orange-600 dark:text-orange-400">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Persistent</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your theme choice is saved and restored on every visit
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Tips */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              💡 Usage Tips
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Quick Theme Switch</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Use the theme selector in the navigation bar for quick theme changes
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Theme Preview</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Hover over any theme to see a live preview before applying it
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Best Themes for Different Times</h4>
                <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  <li>• <strong>Light Theme:</strong> Bright environments, daytime use</li>
                  <li>• <strong>Dark Theme:</strong> Low light, nighttime use</li>
                  <li>• <strong>Blue Theme:</strong> Professional settings</li>
                  <li>• <strong>Green Theme:</strong> Relaxing, nature-inspired</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">Love Your Theme?</h3>
          <p className="text-xl mb-6 opacity-90">
            Share CalcVerse with friends and let them discover their perfect theme too!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Calculators
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
