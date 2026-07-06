/**
 * SearchBar — docs search input with keyboard shortcut hint.
 *
 * Phase 1: read-only stub (UI only, no search logic).
 * Phase 2: wire to a useDocsSearch() hook from features/docs/hooks/
 *           and open a command-palette modal on ⌘K.
 *
 * Styles inherited from docs.css (imported once by DocsPage.jsx).
 */
export default function SearchBar() {
  return (
    <div className="docs-page__search" role="search">
      <span className="docs-page__search-icon" aria-hidden="true">🔍</span>
      <input
        id="docs-search-input"
        className="docs-page__search-input"
        type="search"
        placeholder="Search docs…"
        aria-label="Search documentation"
        readOnly
      />
      <kbd className="docs-page__search-kbd">⌘ K</kbd>
    </div>
  )
}
