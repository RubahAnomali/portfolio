import { useCallback, useState } from 'react'
import Footer from './components/Footer'
import Frame from './components/Frame'
import Loader from './components/Loader'
import Nav from './components/Nav'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Gallery from './components/sections/Gallery'
import Hero from './components/sections/Hero'
import Journey from './components/sections/Journey'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Updates from './components/sections/Updates'
import SocialRail from './components/SocialRail'
import { ActiveContext } from './context/ActiveContext'
import { features, navItems } from './data/site'
import { useActiveSection } from './hooks/useActiveSection'
import { useHashSync } from './hooks/useHashSync'
import { usePageScroll } from './hooks/usePageScroll'

const ids = navItems.map((n) => n.id)

export default function App() {
  const [ready, setReady] = useState(false)
  // Stable on purpose: the Loader restarts its animation whenever this function changes, and App re-renders on every scroll.
  const markReady = useCallback(() => setReady(true), [])
  const { active, visible } = useActiveSection(ids)
  usePageScroll(ids)
  useHashSync(ids, active)

  return (
    <ActiveContext.Provider value={visible}>
      <div className={`site ${ready ? 'is-ready' : ''}`}>
        <Loader onDone={markReady} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav active={active} />
        <SocialRail />
        <Frame active={active} />
        <div id="flow" className="page-flow">
        <main id="main">
          <Hero />
          <About />
          <Updates />
          <Skills />
          <Projects />
          <Journey />
          {features.gallery && <Gallery />}
          <Contact />
        </main>
        <Footer />
        </div>
      </div>
    </ActiveContext.Provider>
  )
}
