/**
 * features/home — Public API barrel file.
 *
 * RULE: All consumers must import from 'features/home' (this file).
 * Never import directly from internal paths like 'features/home/components/Hero'.
 * This boundary lets us restructure internals without breaking consumers.
 */

export { default as HomePage }    from './pages/HomePage'
export { default as Hero }        from './components/Hero'
export { default as StatsBar }    from './components/StatsBar'
export { default as FeatureGrid } from './components/FeatureGrid'
export { default as CtaBanner }   from './components/CtaBanner'
