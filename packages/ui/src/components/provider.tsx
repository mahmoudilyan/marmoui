'use client';

import React from 'react';

// Theme context for storing theme preferences
const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}>({
  theme: 'light',
  setTheme: () => {},
});

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(defaultTheme);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Main provider component that wraps all other providers
interface ProviderProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

export function Provider({ children, theme = 'light' }: ProviderProps) {
  return (
    <ThemeProvider defaultTheme={theme}>
      {children}
    </ThemeProvider>
  );
}