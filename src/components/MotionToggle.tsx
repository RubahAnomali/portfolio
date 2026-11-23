import { useState } from 'react'
import { getMotion, type Motion } from '../lib/motion'

/** Switch page animations on or off. Remembered in this browser. */
export default function MotionToggle() {
  const [mode, setMode] = useState<Motion>(getMotion)
  const full = mode === 'full'

  const toggle = () => {
    const next: Motion = full ? 'reduced' : 'full'
    document.documentElement.dataset.motion = next
    try {
      localStorage.setItem('motion-pref', next)
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
    setMode(next)
  }

  return (
    <button
      type="button"
      className={`theme-toggle motion-toggle ${full ? '' : 'is-off'}`}
      onClick={toggle}
      aria-pressed={full}
      aria-label="Page animations"
      title={full ? 'Animations on (click to turn off)' : 'Animations off (click to turn on)'}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M3 8h10.5a2.5 2.5 0 1 0-2.5-2.5M3 12h15a2.5 2.5 0 1 1-2.5 2.5M3 16h6" />
        {!full && <path d="M4 20 20 4" />}
      </svg>
    </button>
  )
}
