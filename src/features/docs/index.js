/**
 * features/docs — Public API barrel file.
 *
 * RULE: All consumers must import from 'features/docs' (this file).
 * Never import directly from internal paths like 'features/docs/components/DocsLayout'.
 * This boundary lets us restructure internals without breaking consumers.
 */

export { default as DocsPage }     from './pages/DocsPage'
export { default as DocsLayout }   from './components/DocsLayout'
export { default as CategoryCard } from './components/CategoryCard'
export { default as SearchBar }    from './components/SearchBar'
export { default as QuickLinks }   from './components/QuickLinks'
