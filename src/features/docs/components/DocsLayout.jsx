import { Outlet, useMatches } from 'react-router'
import '../styles/docs-layout.css'

/**
 * DocsLayout — shell for the entire /docs subtree.
 *
 * Phase 1: renders a structural scaffold with a sidebar placeholder + content area.
 *
 * Phase 2 upgrades (wired in without layout changes):
 *   - Sidebar nav driven by useMatches() + route handle.sidebar metadata
 *   - Breadcrumb bar assembled from matched route handles
 *   - Tab bar for routes with handle.tabs defined
 *   - Active section highlighting from useMatches()
 *
 * The sidebar config is intentionally driven by route handles so that
 * deeply nested routes can declaratively control what the sidebar shows.
 */
export default function DocsLayout() {
  // Phase 2: collect breadcrumbs & sidebar config from matched routes
  const matches = useMatches()
  const crumbs = matches
    .filter(m => m.handle?.breadcrumb)
    .map(m => ({ label: m.handle.breadcrumb, pathname: m.pathname }))

  return (
    <div className="docs-layout">
      {/* Breadcrumb bar */}
      <nav className="docs-layout__breadcrumbs" aria-label="Breadcrumb">
        {crumbs.map((crumb, i) => (
          <span key={crumb.pathname} className="docs-layout__crumb">
            {i > 0 && <span className="docs-layout__crumb-sep" aria-hidden="true">/</span>}
            <a href={crumb.pathname}>{crumb.label}</a>
          </span>
        ))}
      </nav>

      <div className="docs-layout__body">
        {/* Sidebar — Phase 1: structural stub */}
        <aside className="docs-layout__sidebar" aria-label="Documentation navigation">
          <div className="docs-layout__sidebar-header">
            <span className="docs-layout__sidebar-title">Documentation</span>
          </div>
          <nav className="docs-layout__sidebar-nav">
            {/* Phase 2: rendered from useMatches() + handle.sidebar config */}
            <div className="docs-layout__sidebar-placeholder">
              <div className="docs-layout__sidebar-item docs-layout__sidebar-item--active">
                <span className="docs-sidebar-dot" />
                Getting Started
              </div>
              <div className="docs-layout__sidebar-item">
                <span className="docs-sidebar-dot" />
                Installation
              </div>
              <div className="docs-layout__sidebar-item">
                <span className="docs-sidebar-dot" />
                Configuration
              </div>
              <div className="docs-layout__sidebar-item">
                <span className="docs-sidebar-dot" />
                API Reference
              </div>
              <div className="docs-layout__sidebar-item">
                <span className="docs-sidebar-dot" />
                Examples
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content — child route renders here */}
        <div className="docs-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
