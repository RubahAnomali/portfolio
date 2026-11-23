import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navItems, profile } from '../data/site'
import { Menu } from './Icons'
import MotionToggle from './MotionToggle'
import SoundToggle from './SoundToggle'
import ThemeToggle from './ThemeToggle'

export default function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const list = useRef<HTMLUListElement>(null)
  const [bar, setBar] = useState({ x: 0, w: 0 })

  // Sliding underline, like the reference: measure the active link and translate to it.
  useLayoutEffect(() => {
    const measure = () => {
      const a = list.current?.querySelector<HTMLAnchorElement>('a[aria-current="true"]')
      if (a) setBar({ x: a.offsetLeft, w: a.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav ${open ? 'is-open' : ''}`}>
      <a className="nav-brand" href="#home" aria-label={`${profile.name} — home`}>
        {profile.brandMark}
      </a>
      <nav id="primary-nav" aria-label="Primary">
        <ul ref={list}>
          {navItems.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            </li>
          ))}
          <li className="nav-underline" aria-hidden="true" style={{ transform: `translateX(${bar.x}px)`, width: bar.w }} />
        </ul>
      </nav>
      <div className="nav-actions">
        <a className="nav-pill" href="#contact">
          Get in touch
        </a>
        <SoundToggle />
        <MotionToggle />
        <ThemeToggle />
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu open={open} />
        </button>
      </div>
    </header>
  )
}
