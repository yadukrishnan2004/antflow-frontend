import { Link } from 'react-router'

/**
 * CategoryCard — a single documentation category card.
 *
 * Props:
 *   id           {string}       — URL segment for the category
 *   icon         {string}       — Emoji icon
 *   title        {string}       — Category title
 *   desc         {string}       — Short description
 *   articles     {number}       — Article count
 *   badge        {string|null}  — Optional badge label
 *   badgeVariant {string|null}  — 'green' | 'blue'
 *
 * Styles inherited from docs.css (imported once by DocsPage.jsx).
 */
export default function CategoryCard({ id, icon, title, desc, articles, badge, badgeVariant }) {
  return (
    <Link
      to={`/docs/${id}`}
      id={`doc-category-${id}`}
      className="docs-page__card"
      aria-label={`${title} — ${articles} articles`}
    >
      <div className="docs-page__card-top">
        <span className="docs-page__card-icon" aria-hidden="true">{icon}</span>
        {badge && (
          <span className={`docs-page__badge docs-page__badge--${badgeVariant}`}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="docs-page__card-title">{title}</h3>
      <p className="docs-page__card-desc">{desc}</p>
      <footer className="docs-page__card-footer">
        <span className="docs-page__card-count">{articles} articles</span>
        <span className="docs-page__card-arrow" aria-hidden="true">→</span>
      </footer>
    </Link>
  )
}
