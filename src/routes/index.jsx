import { createBrowserRouter } from 'react-router'

// Global layout shell (not feature-owned)
import RootLayout from '../components/layout/RootLayout'

// Feature public APIs — always import from the barrel, never from internal paths
import { HomePage }             from '../features/home'
import { DocsLayout, DocsPage } from '../features/docs'

// Global catch-all pages (not feature-owned)
import NotFoundPage from '../pages/NotFoundPage'

/**
 * Route Tree
 * /                  → RootLayout (persistent Navbar + Footer shell)
 * ├── index          → HomePage
 * ├── docs           → DocsLayout (sidebar shell — expanded in Phase 2)
 * │   └── index      → DocsPage
 * └── *              → NotFoundPage (catch-all)
 *
 * Every route has:
 *   - handle        → arbitrary metadata (breadcrumbs, sidebar config, page title)
 *   - loader slot   → wire in data fetching without useEffect in Phase 2
 *
 * Code splitting: replace any Component with lazy() — zero refactoring needed:
 *   lazy: () => import('../features/home').then(m => ({ Component: m.HomePage }))
 */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    handle: { breadcrumb: 'Home' },
    children: [
      {
        index: true,
        Component: HomePage,
        handle: {
          breadcrumb: 'Home',
          title: 'AntFlow — Project Download Platform',
        },
        // loader: homeLoader,  ← Phase 2: fetch featured projects
      },
      {
        path: 'docs',
        Component: DocsLayout,
        handle: { breadcrumb: 'Docs', sidebar: 'docs' },
        children: [
          {
            index: true,
            Component: DocsPage,
            handle: {
              breadcrumb: 'Documentation',
              title: 'Documentation — AntFlow',
            },
            // loader: docsIndexLoader,  ← Phase 2: load doc categories
          },
          // Phase 2 routes wired in here:
          // { path: ':category/:slug', lazy: () => import('../features/docs').then(m => ({ Component: m.DocPage })) }
        ],
      },
      // Phase 2:
      // { path: 'projects/:id/download', lazy: () => import('../features/projects').then(m => ({ Component: m.DownloadPage })) }
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
    handle: { title: '404 — Page Not Found' },
  },
])
