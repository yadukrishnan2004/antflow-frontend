import { Link } from 'react-router'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/**
 * Hero — the above-the-fold hero section of the homepage.
 * Includes: ambient glows, badge, headline, subtitle, CTA buttons, terminal card.
 *
 * Uses GSAP staggered entrance animations via useGSAP.
 */
export default function Hero() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from('.home__badge', {
      opacity: 0,
      y: -15,
      duration: 0.8
    })
    .from('.home__title', {
      opacity: 0,
      y: 25,
      duration: 0.8
    }, '-=0.5')
    .from('.home__subtitle', {
      opacity: 0,
      y: 15,
      duration: 0.8
    }, '-=0.5')
    .from('.home__cta', {
      opacity: 0,
      y: 10,
      stagger: 0.1,
      duration: 0.6
    }, '-=0.5')
    .from('.home__hero-card', {
      opacity: 0,
      x: 30,
      scale: 0.98,
      duration: 1.0
    }, '-=0.6')
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="home__hero">
      <div className="home__hero-glow home__hero-glow--left" aria-hidden="true" />
      <div className="home__hero-glow home__hero-glow--right" aria-hidden="true" />

      <div className="home__hero-content">
        <div className="home__badge">
          <span className="home__badge-dot" />
          Now in public beta — explore 2,400+ projects
        </div>

        <h1 className="home__title">
          Download. Configure.
          <br />
          <span className="home__title-gradient">Ship Faster.</span>
        </h1>

        <p className="home__subtitle">
          AntFlow is a curated platform for downloading production-ready project
          templates with first-class documentation, instant setup, and community
          support.
        </p>

        <div className="home__cta-group">
          <Link to="/docs" className="home__cta home__cta--primary">
            Browse Docs
            <span className="home__cta-arrow">→</span>
          </Link>
          <Link to="/projects" className="home__cta home__cta--secondary">
            Explore Projects
          </Link>
        </div>
      </div>

      {/* Floating terminal card */}
      <div className="home__hero-card" aria-hidden="true">
        <div className="home__hero-card-bar">
          <span className="home__hero-card-dot home__hero-card-dot--red" />
          <span className="home__hero-card-dot home__hero-card-dot--yellow" />
          <span className="home__hero-card-dot home__hero-card-dot--green" />
          <span className="home__hero-card-label">terminal</span>
        </div>
        <pre className="home__hero-card-code">
          <span className="home__code-dim">$</span>{' '}
          <span className="home__code-cmd">antflow</span>{' '}
          <span className="home__code-arg">download</span>{' '}
          <span className="home__code-str">react-dashboard</span>
          {'\n'}
          <span className="home__code-dim">✔</span>{' '}
          <span className="home__code-ok">Resolved 48 packages</span>
          {'\n'}
          <span className="home__code-dim">✔</span>{' '}
          <span className="home__code-ok">Integrity verified</span>
          {'\n'}
          <span className="home__code-dim">✔</span>{' '}
          <span className="home__code-ok">Project ready in 1.2s</span>
          {'\n'}
          <span className="home__code-dim">→</span>{' '}
          <span className="home__code-hint">cd react-dashboard && npm run dev</span>
        </pre>
      </div>
    </section>
  )
}
