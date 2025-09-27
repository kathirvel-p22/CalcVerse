import { useState } from 'react';
import useTheme from '../hooks/useTheme';

const ThemeSelector = () => {
  const {
    theme,
    themes,
    currentTheme,
    setLightTheme,
    setDarkTheme,
    setBlueTheme,
    setGreenTheme,
    setPurpleTheme,
    setOrangeTheme,
    setPinkTheme,
    setTealTheme
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

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
    console.log(`🎨 Switching to ${themeKey} theme`);

    // Add loading state
    setIsOpen(false);

    // Apply theme with enhanced feedback
    themeActions[themeKey]();

    // Add visual feedback with success message
    setTimeout(() => {
      console.log(`✅ Theme switched to: ${themeKey}`);
      console.log(`🎯 Current theme classes:`, document.body.className);

      // Show success feedback (you could add a toast notification here)
      const successEvent = new CustomEvent('themeSwitchSuccess', {
        detail: { theme: themeKey, message: `Successfully switched to ${themes[themeKey].name} theme!` }
      });
      document.dispatchEvent(successEvent);
    }, 150);
  };

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
      >
        <span className="text-lg">{currentTheme.icon}</span>
        <span className="text-sm font-medium text-gray-800 dark:text-white">{currentTheme.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Theme Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-xl z-50 max-h-96 overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Choose Theme
            </h3>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {Object.entries(themes).map(([themeKey, themeData]) => (
                <button
                  key={themeKey}
                  onClick={() => handleThemeSelect(themeKey)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    theme === themeKey
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">{themeData.icon}</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {themeData.name}
                    </span>
                    {theme === themeKey && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Preview */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Theme Preview
            </h4>
            <div className={`p-3 rounded-lg ${currentTheme.bg} border ${currentTheme.border} shadow-sm`}>
              <div className={`text-sm ${currentTheme.text} font-medium`}>
                {currentTheme.name} Theme Active
              </div>
              <div className={`text-xs ${currentTheme.text} opacity-75 mt-1`}>
                All elements on this page are using this theme
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSelector;
