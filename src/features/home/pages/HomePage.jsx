import './home.css'
import Hero        from '../components/Hero'
import StatsBar    from '../components/StatsBar'
import FeatureGrid from '../components/FeatureGrid'
import CtaBanner   from '../components/CtaBanner'

/**
 * HomePage — thin assembly page for the "/" route.
 *
 * Composes the four home feature sub-components.
 * All layout logic and data live in the sub-components themselves.
 *
 * Phase 2: add a route loader() here and pass loader data as props
 * to FeatureGrid and StatsBar via useLoaderData().
 */
export default function HomePage() {
  return (
    <div className="home">
      <Hero />
      <StatsBar />
      <FeatureGrid />
      <CtaBanner />
    </div>
  )
}
