import { Suspense, lazy } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { SocialProof } from './components/SocialProof'

const Experience = lazy(() => import('./components/Experience').then((m) => ({ default: m.Experience })))
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })))
const Pricing = lazy(() => import('./components/Pricing').then((m) => ({ default: m.Pricing })))
const FAQ = lazy(() => import('./components/FAQ').then((m) => ({ default: m.FAQ })))
const Credentials = lazy(() => import('./components/Credentials').then((m) => ({ default: m.Credentials })))
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })))
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })))

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <Suspense fallback={null}>
          <Experience />
          <Projects />
          <Pricing />
          <FAQ />
          <Credentials />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
