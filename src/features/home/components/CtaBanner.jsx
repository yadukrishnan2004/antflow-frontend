import { Link } from 'react-router'

/**
 * CtaBanner — bottom call-to-action banner section.
 *
 * Styles inherited from home.css (imported once by HomePage.jsx).
 */
export default function CtaBanner() {
  return (
    <section className="home__banner" aria-labelledby="banner-heading">
      <div className="home__banner-glow" aria-hidden="true" />
      <h2 id="banner-heading" className="home__banner-title">
        Ready to build something great?
      </h2>
      <p className="home__banner-sub">
        Join thousands of developers already shipping faster with AntFlow.
      </p>
      <Link to="/docs" className="home__cta home__cta--primary">
        Get Started Free
        <span className="home__cta-arrow">→</span>
      </Link>
    </section>
  )
}
