import { Link, useNavigate } from 'react-router'
import './not-found.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="not-found__glow" aria-hidden="true" />

      <div className="not-found__content">
        {/* Animated 404 */}
        <div className="not-found__code" aria-hidden="true">
          <span className="not-found__digit">4</span>
          <span className="not-found__zero">
            <span className="not-found__zero-inner" />
          </span>
          <span className="not-found__digit">4</span>
        </div>

        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__desc">
          The page you're looking for doesn't exist, was moved, or the URL might be
          mistyped. Check the address and try again.
        </p>

        <div className="not-found__actions">
          <button
            id="not-found-go-back"
            type="button"
            className="not-found__btn not-found__btn--secondary"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
          <Link
            id="not-found-go-home"
            to="/"
            className="not-found__btn not-found__btn--primary"
          >
            Go Home →
          </Link>
          <Link
            id="not-found-go-docs"
            to="/docs"
            className="not-found__btn not-found__btn--ghost"
          >
            Browse Docs
          </Link>
        </div>
      </div>
    </div>
  )
}
