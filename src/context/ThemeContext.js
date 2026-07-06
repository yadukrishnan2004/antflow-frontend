import { createContext, useContext } from 'react'

export const ThemeContext = createContext(null)

/**
 * useTheme Hook
 * Returns: { theme, isDark, isLight, toggleTheme, setTheme, clearTheme }
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
