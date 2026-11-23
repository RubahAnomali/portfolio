import { useEffect, useState } from 'react'
import { profile } from '../data/site'
import { isReduced } from '../lib/motion'

const KEY = 'portfolio-loaded'

const seen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** Loading screen: logo, hatched bracket bar, "- LOADING n% -". Skipped for reduced motion / repeat visits. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const skip = seen() || isReduced()
  const [pct, setPct] = useState(skip ? 100 : 0)

  useEffect(() => {
    if (skip) {
      onDone()
      return
    }
    const start = performance.now()
    const dur = 1700
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      setPct(Math.round((1 - Math.pow(1 - t, 2)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        try {
          sessionStorage.setItem(KEY, '1')
        } catch {
          /* ignore */
        }
        setTimeout(onDone, 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [skip, onDone])

  if (skip) return null
  return (
    <div className={`loader ${pct === 100 ? 'is-done' : ''}`} role="status" aria-live="polite">
      <div className="loader-blocks" aria-hidden="true" />
      <div className="loader-inner">
        <p className="loader-logo">{profile.wordmark}</p>
        <p className="loader-sub">{profile.role}</p>
        <div className="loader-bar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="loader-pct">– LOADING {pct}% –</p>
      </div>
      <p className="loader-credit">{profile.copyright}</p>
    </div>
  )
}
