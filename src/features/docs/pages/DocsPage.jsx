import '../styles/docs.css'
import SearchBar    from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import QuickLinks   from '../components/QuickLinks'

/**
 * Static doc category data.
 *
 * Phase 2: delete this and replace with:
 *   const categories = useLoaderData()
 * after wiring a route loader in routes/index.jsx that calls
 * features/docs/services/docsService.js
 */
const DOC_CATEGORIES = [
  {
    id: 'getting-started',
    icon: '🚀',
    title: 'Getting Started',
    desc: 'Install AntFlow, set up your workspace, and download your first project in under five minutes.',
    articles: 6,
    badge: 'Start here',
    badgeVariant: 'green',
  },
  {
    id: 'cli-reference',
    icon: '🖥️',
    title: 'CLI Reference',
    desc: 'Complete reference for every AntFlow command, flag, and configuration option.',
    articles: 14,
    badge: null,
  },
  {
    id: 'configuration',
    icon: '⚙️',
    title: 'Configuration',
    desc: 'Customize project templates, output paths, registries, and authentication.',
    articles: 9,
    badge: null,
  },
  {
    id: 'project-templates',
    icon: '📦',
    title: 'Project Templates',
    desc: 'Understand the template format, metadata schema, and how to publish your own.',
    articles: 11,
    badge: null,
  },
  {
    id: 'api-reference',
    icon: '📡',
    title: 'API Reference',
    desc: 'REST and GraphQL API docs for integrating AntFlow into your own tooling.',
    articles: 18,
    badge: 'Updated',
    badgeVariant: 'blue',
  },
  {
    id: 'guides',
    icon: '🗺️',
    title: 'Guides',
    desc: 'In-depth tutorials: CI/CD pipelines, monorepo setups, private registries, and more.',
    articles: 8,
    badge: null,
  },
]

/**
 * DocsPage — thin assembly page for the "/docs" route.
 *
 * Composes the three docs feature sub-components.
 * Phase 2: replace DOC_CATEGORIES with useLoaderData() and wire the
 *           route loader in routes/index.jsx.
 */
export default function DocsPage() {
  return (
    <div className="docs-page">
      <header className="docs-page__header">
        <h1 className="docs-page__title">Documentation</h1>
        <p className="docs-page__subtitle">
          Everything you need to master AntFlow — from first download to advanced
          integrations.
        </p>
        <SearchBar />
      </header>

      <section className="docs-page__categories" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">Documentation categories</h2>
        <div className="docs-page__grid">
          {DOC_CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </section>

      <QuickLinks />
    </div>
  )
}
