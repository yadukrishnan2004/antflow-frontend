/**
 * FeatureGrid — "Everything you need" section with feature cards.
 *
 * Styles inherited from home.css (imported once by HomePage.jsx).
 *
 * Phase 2: accept `features` as a prop so the grid can be driven
 * by data from the route loader instead of this static array.
 */

const FEATURES = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Download and deploy projects in seconds with our optimized delivery network.',
  },
  {
    icon: '🔧',
    title: 'Fully Configurable',
    desc: 'Every project ships with sane defaults and deep customization options.',
  },
  {
    icon: '📦',
    title: 'Ready to Use',
    desc: 'Production-ready templates with CI/CD, tests, and docs already wired up.',
  },
  {
    icon: '🔒',
    title: 'Secure by Default',
    desc: 'All packages are signed, versioned, and integrity-checked on every download.',
  },
  {
    icon: '🌐',
    title: 'Community Driven',
    desc: 'Thousands of community projects vetted and curated by our review team.',
  },
  {
    icon: '📖',
    title: 'Deep Documentation',
    desc: 'Every project includes step-by-step guides, API references, and examples.',
  },
]

export default function FeatureGrid({ features = FEATURES }) {
  return (
    <section className="home__features" aria-labelledby="features-heading">
      <div className="home__features-header">
        <h2 id="features-heading" className="home__features-title">
          Everything you need, nothing you don't
        </h2>
        <p className="home__features-subtitle">
          Built for developers who value quality, speed, and simplicity.
        </p>
      </div>
      <div className="home__features-grid">
        {features.map(f => (
          <article key={f.title} className="home__feature-card">
            <div className="home__feature-icon" aria-hidden="true">{f.icon}</div>
            <h3 className="home__feature-title">{f.title}</h3>
            <p className="home__feature-desc">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
