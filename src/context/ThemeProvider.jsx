import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext.js'

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'antflow-theme'
const THEME_DARK  = 'dark'
const THEME_LIGHT = 'light'
const DATA_ATTR   = 'data-theme'   // attribute set on <html>

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the OS-level colour-scheme preference */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME_DARK
    : THEME_LIGHT
}

/**
 * Returns the saved theme from localStorage.
 * Returns null if the user has never manually chosen a theme.
 */
function getSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === THEME_DARK || saved === THEME_LIGHT ? saved : null
  } catch {
    return null
  }
}

/** Applies a theme by setting data-theme on <html> */
function applyTheme(theme) {
  document.documentElement.setAttribute(DATA_ATTR, theme)
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }) {
  // If no saved theme exists, we start with 'system' as the default mode
  const [themeMode, setThemeMode] = useState(() => {
    return getSavedTheme() || 'system'
  })

  // Derive the active theme (either 'dark' or 'light')
  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = getSavedTheme()
    return saved || getSystemTheme()
  })

  // Keep activeTheme in sync with themeMode and system preference
  useEffect(() => {
    if (themeMode === 'system') {
      setActiveTheme(getSystemTheme())
    } else {
      setActiveTheme(themeMode)
    }
  }, [themeMode])

  // Apply changes to document <html> element
  useEffect(() => {
    applyTheme(activeTheme)
  }, [activeTheme])

  // Real-time system preference listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    function handleOsChange() {
      if (themeMode === 'system') {
        setActiveTheme(getSystemTheme())
      }
    }

    mq.addEventListener('change', handleOsChange)
    return () => mq.removeEventListener('change', handleOsChange)
  }, [themeMode])

  // ── Public API ───────────────────────────────────────────────────────────

  function setTheme(newMode) {
    if (newMode !== THEME_DARK && newMode !== THEME_LIGHT && newMode !== 'system') return
    
    try {
      if (newMode === 'system') {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, newMode)
      }
    } catch { /* ignore */ }
    
    setThemeMode(newMode)
  }

  function toggleTheme() {
    // Cycles: system -> light -> dark -> system
    if (themeMode === 'system') {
      setTheme(THEME_LIGHT)
    } else if (themeMode === THEME_LIGHT) {
      setTheme(THEME_DARK)
    } else {
      setTheme('system')
    }
  }

  function clearTheme() {
    setTheme('system')
  }

  const value = {
    themeMode, // 'system' | 'dark' | 'light'
    theme: activeTheme, // resolved theme: 'dark' | 'light'
    isDark: activeTheme === THEME_DARK,
    isLight: activeTheme === THEME_LIGHT,
    isSystem: themeMode === 'system',
    toggleTheme,
    setTheme,
    clearTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
