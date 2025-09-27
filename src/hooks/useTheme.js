import { useState, useEffect } from 'react';

const themes = {
  light: {
    name: 'Light',
    icon: '☀️',
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    card: 'bg-white',
    border: 'border-gray-200'
  },
  dark: {
    name: 'Dark',
    icon: '🌙',
    bg: 'bg-gray-900',
    text: 'text-white',
    card: 'bg-gray-800',
    border: 'border-gray-700'
  },
  blue: {
    name: 'Blue',
    icon: '🔵',
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    card: 'bg-blue-100',
    border: 'border-blue-200'
  },
  green: {
    name: 'Green',
    icon: '🟢',
    bg: 'bg-green-50',
    text: 'text-green-900',
    card: 'bg-green-100',
    border: 'border-green-200'
  },
  purple: {
    name: 'Purple',
    icon: '🟣',
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    card: 'bg-purple-100',
    border: 'border-purple-200'
  },
  orange: {
    name: 'Orange',
    icon: '🟠',
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    card: 'bg-orange-100',
    border: 'border-orange-200'
  },
  pink: {
    name: 'Pink',
    icon: '🩷',
    bg: 'bg-pink-50',
    text: 'text-pink-900',
    card: 'bg-pink-100',
    border: 'border-pink-200'
  },
  teal: {
    name: 'Teal',
    icon: '🟦',
    bg: 'bg-teal-50',
    text: 'text-teal-900',
    card: 'bg-teal-100',
    border: 'border-teal-200'
  }
};

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // Apply theme to document
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (themeName) => {
    // Validate theme name
    if (!themes[themeName]) {
      console.warn(`Theme "${themeName}" not found. Available themes:`, Object.keys(themes));
      return;
    }

    console.log(`🎨 Applying theme: ${themeName}`);

    // Remove all theme classes from both html and body
    Object.keys(themes).forEach(themeKey => {
      document.documentElement.classList.remove(`theme-${themeKey}`);
      document.body.classList.remove(`theme-${themeKey}`);
    });

    // Add the new theme class to both html and body
    document.documentElement.classList.add(`theme-${themeName}`);
    document.body.classList.add(`theme-${themeName}`);

    // Handle dark mode specifically
    if (themeName === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }

    // Force multiple style recalculations for better theme application
    const forceRepaint = () => {
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';

      // Additional repaint for complex themes
      setTimeout(() => {
        document.body.style.transform = 'translateZ(0)';
        document.body.offsetHeight;
        document.body.style.transform = '';
      }, 10);
    };

    forceRepaint();

    // Dispatch custom event for theme change
    const themeChangeEvent = new CustomEvent('themeChanged', {
      detail: { theme: themeName, themeData: themes[themeName] }
    });
    document.dispatchEvent(themeChangeEvent);

    console.log(`✅ Theme "${themeName}" applied successfully`);
  };

  const setThemeByName = (themeName) => {
    if (!themes[themeName]) return;

    setTheme(themeName);
    localStorage.setItem('theme', themeName);
    applyTheme(themeName);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeByName(newTheme);
  };

  const setLightTheme = () => setThemeByName('light');
  const setDarkTheme = () => setThemeByName('dark');
  const setBlueTheme = () => setThemeByName('blue');
  const setGreenTheme = () => setThemeByName('green');
  const setPurpleTheme = () => setThemeByName('purple');
  const setOrangeTheme = () => setThemeByName('orange');
  const setPinkTheme = () => setThemeByName('pink');
  const setTealTheme = () => setThemeByName('teal');

  return {
    theme,
    themes,
    currentTheme: themes[theme],
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setBlueTheme,
    setGreenTheme,
    setPurpleTheme,
    setOrangeTheme,
    setPinkTheme,
    setTealTheme,
    setThemeByName,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };
};

export default useTheme;
