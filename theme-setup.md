# Theme System — Complete Implementation Guide
### AntFlow | Dark Mode & Light Mode with React Context + CSS Variables

---

## Architecture Overview

```
src/
├── context/
│   └── ThemeContext.jsx        ← ThemeProvider + useTheme hook  [NEW]
├── styles/
│   └── index.css              ← Add theme variable blocks here  [MODIFY]
├── components/layout/
│   ├── Navbar.jsx             ← Add theme toggle button          [MODIFY]
│   └── navbar.css             ← Add toggle button styles         [MODIFY]
└── main.jsx                   ← Wrap app in ThemeProvider        [MODIFY]
```

**How it works:**

```
OS/localStorage
      │
      ▼
ThemeContext (useEffect on mount)
      │  resolves initial theme
      │  sets data-theme="dark"|"light" on <html>
      │  subscribes to matchMedia changes
      ▼
CSS Variables (:root[data-theme="dark"] / :root[data-theme="light"])
      │  --bg-base, --text-primary, --border-subtle, etc. swap values
      ▼
All components styled with var(--bg-base) etc. — zero component changes needed
```

---

## Step 1 — Add Theme CSS Variables to `src/styles/index.css`

Replace the **"Semantic Aliases"** block (section 3) in your existing `index.css`.
The raw palette tokens (brand, neutral, accent) in section 2 stay unchanged.

Add the following **after** your existing `:root { ... }` block:

```css
/* ==========================================================================
   THEME SYSTEM — replaces the hardcoded semantic aliases in :root
   Apply to bottom of the existing :root block, or after it.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Dark theme (default — matches current design)
   -------------------------------------------------------------------------- */
:root,
:root[data-theme="dark"] {
  color-scheme: dark;

  /* Backgrounds */
  --bg-base:         hsl(220, 17%, 6%);
  --bg-surface:      hsl(220, 15%, 9%);
  --bg-elevated:     hsl(220, 14%, 12%);
  --bg-overlay:      hsl(220, 13%, 16%);

  /* Text */
  --text-primary:    hsl(220, 14%, 98%);
  --text-secondary:  hsl(220, 11%, 76%);
  --text-muted:      hsl(220, 8%, 46%);
  --text-inverse:    hsl(220, 17%, 6%);

  /* Borders */
  --border-subtle:   hsl(220, 13%, 16%);
  --border-default:  hsl(220, 12%, 20%);
  --border-strong:   hsl(220, 11%, 28%);

  /* Navbar glass */
  --navbar-bg:       hsl(220, 15%, 9% / 0.85);

  /* Shadows */
  --shadow-sm:   0 1px 2px  hsl(0 0% 0% / 0.3);
  --shadow-md:   0 4px 12px hsl(0 0% 0% / 0.4);
  --shadow-lg:   0 8px 24px hsl(0 0% 0% / 0.5);
  --shadow-xl:   0 16px 48px hsl(0 0% 0% / 0.6);
  --shadow-glow: 0 0 40px   hsl(235, 70%, 52% / 0.25);

  /* Theme toggle icon */
  --theme-toggle-icon: "☀️";
}

/* --------------------------------------------------------------------------
   Light theme
   -------------------------------------------------------------------------- */
:root[data-theme="light"] {
  color-scheme: light;

  /* Backgrounds */
  --bg-base:         hsl(220, 14%, 98%);
  --bg-surface:      hsl(220, 13%, 95%);
  --bg-elevated:     hsl(220, 12%, 91%);
  --bg-overlay:      hsl(220, 11%, 86%);

  /* Text */
  --text-primary:    hsl(220, 17%, 10%);
  --text-secondary:  hsl(220, 10%, 32%);
  --text-muted:      hsl(220, 8%, 52%);
  --text-inverse:    hsl(220, 14%, 98%);

  /* Borders */
  --border-subtle:   hsl(220, 12%, 88%);
  --border-default:  hsl(220, 11%, 80%);
  --border-strong:   hsl(220, 10%, 68%);

  /* Navbar glass */
  --navbar-bg:       hsl(220, 14%, 98% / 0.88);

  /* Shadows */
  --shadow-sm:   0 1px 2px  hsl(220 20% 20% / 0.08);
  --shadow-md:   0 4px 12px hsl(220 20% 20% / 0.10);
  --shadow-lg:   0 8px 24px hsl(220 20% 20% / 0.12);
  --shadow-xl:   0 16px 48px hsl(220 20% 20% / 0.14);
  --shadow-glow: 0 0 40px   hsl(235, 70%, 52% / 0.15);

  /* Theme toggle icon */
  --theme-toggle-icon: "🌙";
}

/* --------------------------------------------------------------------------
   Smooth theme transition — apply to everything except images/video
   -------------------------------------------------------------------------- */
*,
*::before,
*::after {
  transition:
    background-color 200ms ease,
    border-color     200ms ease,
    color            100ms ease,
    box-shadow       200ms ease;
}

img, video, svg, canvas {
  transition: none;  /* prevent images flashing during theme swap */
}
```

> **Why `data-theme` on `:root`?**
> Setting the attribute on `<html>` (`:root`) means every CSS variable cascades
> to every element automatically. No per-component class toggling needed.

---

## Step 2 — Create `src/context/ThemeContext.jsx`

This is the complete, self-contained ThemeProvider. Create this file fresh:

```jsx
import { createContext, useContext, useEffect, useState } from 'react'

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY   = 'antflow-theme'          // localStorage key
const THEME_DARK    = 'dark'
const THEME_LIGHT   = 'light'
const DATA_ATTR     = 'data-theme'             // attribute on <html>

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns the OS-level theme preference */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME_DARK
    : THEME_LIGHT
}

/**
 * Reads the saved theme from localStorage.
 * Returns null if the user has never manually set a theme.
 */
function getSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === THEME_DARK || saved === THEME_LIGHT ? saved : null
  } catch {
    // localStorage can throw in private browsing / SSR
    return null
  }
}

/** Applies a theme by setting data-theme on <html> */
function applyTheme(theme) {
  document.documentElement.setAttribute(DATA_ATTR, theme)
}

/** Resolves the initial theme on first load */
function resolveInitialTheme() {
  const saved = getSavedTheme()
  return saved ?? getSystemTheme()   // saved choice wins; fallback to OS
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null)

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * ThemeProvider
 *
 * Wrap your app with this. It:
 *   1. Resolves initial theme (localStorage → OS preference)
 *   2. Applies it to <html data-theme="...">
 *   3. Listens for OS-level theme changes (only if user hasn't locked a theme)
 *   4. Persists manual selections to localStorage
 *
 * Usage:
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(resolveInitialTheme)

  // ── Apply theme to <html> on every change ──
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // ── Listen to OS-level changes ──────────────
  // Only auto-follow if the user hasn't manually locked a preference.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    function handleOsChange(e) {
      // If user has a saved preference, don't override it
      if (getSavedTheme() !== null) return
      setThemeState(e.matches ? THEME_DARK : THEME_LIGHT)
    }

    // Modern browsers
    mediaQuery.addEventListener('change', handleOsChange)

    // Cleanup on unmount
    return () => mediaQuery.removeEventListener('change', handleOsChange)
  }, [])

  // ── Public API ──────────────────────────────

  /**
   * setTheme(theme)
   * Manually lock a theme and persist it to localStorage.
   */
  function setTheme(newTheme) {
    if (newTheme !== THEME_DARK && newTheme !== THEME_LIGHT) return
    try {
      localStorage.setItem(STORAGE_KEY, newTheme)
    } catch { /* ignore */ }
    setThemeState(newTheme)
  }

  /**
   * toggleTheme()
   * Flips between dark and light and persists the choice.
   */
  function toggleTheme() {
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)
  }

  /**
   * clearTheme()
   * Removes the manual lock — the site will follow OS preference again.
   */
  function clearTheme() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch { /* ignore */ }
    setThemeState(getSystemTheme())
  }

  const value = {
    theme,           // 'dark' | 'light'
    isDark:  theme === THEME_DARK,
    isLight: theme === THEME_LIGHT,
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

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * useTheme()
 *
 * Returns: { theme, isDark, isLight, toggleTheme, setTheme, clearTheme }
 *
 * Must be used inside a <ThemeProvider>.
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside a <ThemeProvider>')
  }
  return context
}
```

---

## Step 3 — Wrap the App in `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { ThemeProvider } from './context/ThemeContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

> **Why ThemeProvider wraps App (not RouterProvider)?**
> RouterProvider creates the router context. ThemeProvider must be outside it
> so that layouts (Navbar, Footer) can call `useTheme()`.
> The nesting order is: `StrictMode > ThemeProvider > App > RouterProvider`.

---

## Step 4 — Add Theme Toggle Button to `src/components/layout/Navbar.jsx`

Add the `useTheme` import and insert the toggle button into the actions area:

```jsx
import { NavLink, Link } from 'react-router'
import { useTheme } from '../../context/ThemeContext'
import './navbar.css'

const NAV_LINKS = [
  { to: '/docs',      label: 'Docs' },
  { to: '/projects',  label: 'Projects' },
  { to: '/community', label: 'Community' },
  { to: '/blog',      label: 'Blog' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="navbar" role="banner">
      <div className="navbar__inner">

        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="AntFlow home">
          <span className="navbar__logo-icon" aria-hidden="true">⬡</span>
          <span className="navbar__logo-text">
            Ant<span className="navbar__logo-accent">Flow</span>
          </span>
        </Link>

        {/* Primary nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__nav-list" role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  id={`nav-link-${label.toLowerCase()}`}
                  className={({ isActive }) =>
                    ['navbar__nav-link', isActive ? 'navbar__nav-link--active' : ''].join(' ').trim()
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="navbar__actions">

          {/* ── Theme Toggle ── */}
          <button
            id="navbar-theme-toggle"
            type="button"
            className="navbar__action navbar__action--icon navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              /* Sun icon — click to go light */
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                   strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41
                         M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              /* Moon icon — click to go dark */
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                   strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            id="navbar-github-link"
            className="navbar__action navbar__action--icon"
            aria-label="GitHub repository"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                       0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                       -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                       .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                       -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844
                       a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
                       .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
                       0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017
                       C22 6.484 17.522 2 12 2Z" />
            </svg>
          </a>

          {/* Download CTA */}
          <Link
            to="/projects"
            id="navbar-download-btn"
            className="navbar__action navbar__action--btn"
          >
            Download
          </Link>

        </div>
      </div>
    </header>
  )
}
```

---

## Step 5 — Add Toggle Button Styles to `src/components/layout/navbar.css`

Append these rules to the bottom of your existing `navbar.css`:

```css
/* ── Theme Toggle Button ────────────────────────────────────────────────── */
.navbar__theme-toggle {
  position: relative;
  overflow: hidden;
}

.navbar__theme-toggle svg {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 200ms ease;
}

.navbar__theme-toggle:hover svg {
  transform: rotate(20deg) scale(1.1);
}

/* Active press feedback */
.navbar__theme-toggle:active {
  transform: scale(0.92);
}
```

---

## Step 6 — Update `src/styles/index.css` — Fix Navbar bg Variable

Your existing `navbar.css` uses a hardcoded HSL value for the navbar background.
Update it to use the new `--navbar-bg` token:

In `src/components/layout/navbar.css`, change:

```css
/* OLD */
background: hsl(220, 15%, 9% / 0.85);

/* NEW */
background: var(--navbar-bg);
```

This ensures the navbar glass effect adapts correctly in both themes.

---

## FOUC Prevention — Block Render Until Theme is Applied

> [!WARNING]
> Without this, on first load there can be a brief flash of the wrong theme
> before React hydrates. Fix this by injecting a blocking `<script>` in `index.html`
> that runs *before* any React code.

Add this `<script>` tag to `index.html` — inside `<head>`, **before** any other `<script>`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>antflow</title>

    <!-- ⚡ Theme initialization script — runs before React, prevents FOUC -->
    <script>
      (function () {
        var STORAGE_KEY = 'antflow-theme';
        var saved = null;
        try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
        var theme = (saved === 'dark' || saved === 'light')
          ? saved
          : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>
    <!-- End theme init -->

  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

> This tiny inline script runs synchronously in `<head>` — the page is not
> painted until after it runs, so `data-theme` is always set correctly before
> any CSS is applied. Zero flicker.

---

## Complete File Summary

| File | Action | What changes |
|---|---|---|
| `src/styles/index.css` | MODIFY | Replace hardcoded semantic aliases with `[data-theme]` blocks + transition rule |
| `src/context/ThemeContext.jsx` | CREATE | ThemeProvider + useTheme hook |
| `src/main.jsx` | MODIFY | Import ThemeProvider, wrap App |
| `src/components/layout/Navbar.jsx` | MODIFY | Import useTheme, add toggle button |
| `src/components/layout/navbar.css` | MODIFY | Add toggle button styles + fix `--navbar-bg` token |
| `index.html` | MODIFY | Add FOUC-prevention inline script |

---

## Using `useTheme` in Any Component

```jsx
import { useTheme } from '@/context/ThemeContext'  // or relative path

function MyComponent() {
  const { theme, isDark, toggleTheme, setTheme, clearTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>

      <button onClick={toggleTheme}>Toggle</button>

      <button onClick={() => setTheme('dark')}>Force Dark</button>
      <button onClick={() => setTheme('light')}>Force Light</button>

      {/* Reset to OS preference */}
      <button onClick={clearTheme}>Follow OS</button>
    </div>
  )
}
```

---

## Verification Checklist

| Test | How to verify |
|---|---|
| **Default to OS preference** | Open site in incognito (no localStorage). Check `<html data-theme="...">` matches OS setting |
| **Persist on refresh** | Toggle theme, refresh page — should stay on chosen theme |
| **OS change auto-follow** | Clear localStorage, open DevTools, toggle "Emulate CSS prefers-color-scheme" — site should follow without a page reload |
| **Manual lock blocks OS change** | Set a theme manually (localStorage is set), then toggle OS emulation — site should NOT change |
| **No FOUC** | Hard refresh (Ctrl+Shift+R) — no white flash before dark theme loads |
| **Transition smoothness** | Toggle theme — backgrounds, text, borders all fade smoothly in 200ms |
| **Accessibility** | Navbar toggle has correct `aria-label` that updates with theme state |
