import { Link } from 'react-router'
import './footer.css'

const FOOTER_LINKS = {
  Product: [
    { label: 'Projects', to: '/projects' },
    { label: 'Documentation', to: '/docs' },
    { label: 'Changelog', to: '/changelog' },
    { label: 'Roadmap', to: '/roadmap' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Community', to: '/community' },
    { label: 'Contact', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'License', to: '/license' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="AntFlow home">
            <span className="footer__logo-icon" aria-hidden="true">⬡</span>
            <span className="footer__logo-text">
              Ant<span className="footer__logo-accent">Flow</span>
            </span>
          </Link>
          <p className="footer__tagline">
            The fastest way to download and ship production-ready projects.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="footer__nav-group">
              <h3 className="footer__nav-heading">{group}</h3>
              <ul className="footer__nav-list" role="list">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to} className="footer__nav-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} AntFlow. All rights reserved.
        </p>
        <p className="footer__made">
          Built with React + Vite
        </p>
      </div>
    </footer>
  )
}
