import { useState } from 'react'
import { ambientOff, ambientOn } from '../lib/ambient'

/** Music note button in the nav (the reference has one): toggles a quiet generated ambient pad. Off by default. */
export default function SoundToggle() {
  const [on, setOn] = useState(false)

  const toggle = () => {
    if (on) {
      ambientOff()
      setOn(false)
    } else if (ambientOn()) {
      setOn(true)
    }
  }

  return (
    <button
      type="button"
      className={`theme-toggle sound-toggle ${on ? 'is-on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label="Ambient music"
      title={on ? 'Music on (click to turn off)' : 'Music off (click to turn on)'}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M9 18V6l11-2v12" />
        <circle cx="6.5" cy="18" r="2.5" />
        <circle cx="17.5" cy="16" r="2.5" />
        {!on && <path d="M3 21 21 3" />}
      </svg>
    </button>
  )
}
