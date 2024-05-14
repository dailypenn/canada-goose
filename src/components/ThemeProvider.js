import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../utils/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const displayPreference = useSelector(state => state.settings.displayPreference);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const updateTheme = () => {
      switch (displayPreference) {
        case 'light':
          setTheme(lightTheme);
          break;
        case 'dark':
          setTheme(darkTheme);
          break;
        case 'device':
          const systemPreference = Appearance.getColorScheme() || 'light';
          setTheme(systemPreference === 'dark' ? darkTheme : lightTheme);
          break;
        default:
          setTheme(lightTheme); // Fallback to light theme
      }
    };

    updateTheme();

  }, [displayPreference]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
