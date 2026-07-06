import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './layout.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/**
 * RootLayout — persistent application shell.
 *
 * Renders page transitions on path navigation using GSAP useGSAP.
 */
export default function RootLayout() {
  const location = useLocation()
  const pageRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(pageRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    )
  }, [location.pathname])

  return (
    <div className="root-layout">
      <Navbar />
      <main ref={pageRef} className="root-layout__main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
