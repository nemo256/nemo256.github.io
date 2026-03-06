/* ThemeContext.jsx */
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

// Set the theme attribute immediately (before paint) to avoid flash
function getInitialDark() {
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getInitialDark);

  // Apply theme to <html> on every change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  // Also set immediately on mount so CSS variables are correct before first paint
  useState(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  });

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
