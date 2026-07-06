import { Link } from 'react-router'

/**
 * QuickLinks — "Popular Articles" list at the bottom of the docs landing page.
 *
 * Phase 1: static list of popular article titles.
 * Phase 2: accept `articles` as a prop driven by the route loader,
 *           with real hrefs instead of "#".
 *
 * Styles inherited from docs.css (imported once by DocsPage.jsx).
 */

const POPULAR_ARTICLES = [
  'Installing AntFlow globally',
  'Downloading your first project',
  'Setting up a private registry',
  'Using AntFlow in CI/CD pipelines',
  'Publishing a project template',
]

export default function QuickLinks({ articles = POPULAR_ARTICLES }) {
  return (
    <section className="docs-page__quick" aria-labelledby="quick-heading">
      <h2 id="quick-heading" className="docs-page__quick-title">Popular Articles</h2>
      <ul className="docs-page__quick-list">
        {articles.map(article => (
          <li key={article} className="docs-page__quick-item">
            <Link to="#" className="docs-page__quick-link">
              <span className="docs-page__quick-icon" aria-hidden="true">📄</span>
              {article}
              <span className="docs-page__quick-arrow" aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
