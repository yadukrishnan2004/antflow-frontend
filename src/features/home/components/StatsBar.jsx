/**
 * StatsBar — platform statistics strip.
 * Displays key trust metrics: project count, download count, rating, uptime.
 *
 * Styles inherited from home.css (imported once by HomePage.jsx).
 *
 * Phase 2: replace STATS with live data via props or useLoaderData().
 */

const STATS = [
  { value: '2,400', suffix: '+', label: 'Projects' },
  { value: '180k',  suffix: '+', label: 'Downloads' },
  { value: '4.9',   suffix: '★', label: 'Community Rating' },
  { value: '99.9',  suffix: '%', label: 'Uptime' },
]

export default function StatsBar() {
  return (
    <section className="home__stats" aria-label="Platform statistics">
      {STATS.map((stat, i) => (
        <>
          {i > 0 && <div key={`div-${stat.label}`} className="home__stat-divider" aria-hidden="true" />}
          <div key={stat.label} className="home__stat">
            <span className="home__stat-value">
              {stat.value}
              <span className="home__stat-plus">{stat.suffix}</span>
            </span>
            <span className="home__stat-label">{stat.label}</span>
          </div>
        </>
      ))}
    </section>
  )
}
