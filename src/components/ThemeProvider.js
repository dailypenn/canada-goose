import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../utils/themes';

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const displayPreference = useSelector(state => state.settings.displayPreference);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const updateTheme = (preferences) => {
      switch (displayPreference) {
        case 'light':
          setTheme(lightTheme);
          break;
        case 'dark':
          setTheme(darkTheme);
          break;
        case 'device':
          const systemPreference = preferences.colorScheme || Appearance.getColorScheme();
          setTheme(systemPreference === 'dark' ? darkTheme : lightTheme);
          break;
        default:
          setTheme(lightTheme); // Fallback to light theme
      }
    };

    updateTheme({ colorScheme: Appearance.getColorScheme() });

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (displayPreference === 'device') {
        setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
      }
    });

    // Cleanup subscriptions
    return () => subscription.remove();
  }, [displayPreference]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
