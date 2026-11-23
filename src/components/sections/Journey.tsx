import { memo, useState } from 'react'
import { chapters, profile } from '../../data/site'
import { Chevron } from '../Icons'
import Slide from '../Slide'

// Fan layout for the stack on the right (matches the reference's tilt values).
const FAN = [
  { r: 0, s: 1, x: 0, y: 0 },
  { r: -5, s: 0.8, x: 5, y: -1 },
  { r: -20, s: 0.7, x: 5, y: 0 },
]

/** "Comic" slide: a 3D book for the selected chapter + a fanned stack of chapter covers. */
function Journey() {
  const [i, setI] = useState(0)
  const go = (n: number) => setI(Math.max(0, Math.min(chapters.length - 1, n)))
  const cur = chapters[i]
  // centre the visible cards (at most two either side of the selected one)
  const first = Math.max(-i, -2)
  const last = Math.min(chapters.length - 1 - i, 2)
  const shift = -(first + last) / 2

  return (
    <Slide id="journey" title="Journey" className="slide-pale">
      <div className="journey">
        <div className="book-wrap enter" data-enter="left">
          <div className="book" key={cur.no}>
            <div className="book-cover">
              <span className="book-no" aria-hidden="true">
                {cur.no}
              </span>
              <p className="book-period">{cur.period}</p>
              <h3>{cur.role}</h3>
              <p className="book-co">{cur.company}</p>
              <span className="book-read" aria-hidden="true">
                Read ›
              </span>
            </div>
          </div>
          <ul className="book-points" aria-live="polite">
            {cur.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="stack-wrap enter" data-enter="right" style={{ ['--i' as string]: 1 }}>
          <div className="v-slider" role="group" aria-label="Chapters">
            <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous chapter">
              <Chevron dir="left" />
            </button>
            <span aria-hidden="true" />
            <button type="button" onClick={() => go(i + 1)} disabled={i === chapters.length - 1} aria-label="Next chapter">
              <Chevron dir="right" />
            </button>
          </div>
          <ol className="fan" style={{ transform: `translateY(calc(${shift} * (var(--ch) + 1.4rem)))` }}>
            {chapters.map((c, n) => {
              const d = n - i
              const a = Math.min(Math.abs(d), 2)
              const f = FAN[a]
              const sign = d < 0 ? -1 : 1
              return (
                <li
                  key={c.no}
                  style={{
                    transform: `translateY(calc(${d} * (var(--ch) + 1.4rem))) rotate(${f.r * -sign}deg) scale(${f.s}) translateX(${f.x}vw)`,
                    zIndex: 5 - a,
                    opacity: Math.abs(d) > 2 ? 0 : 1,
                    pointerEvents: Math.abs(d) > 2 ? 'none' : 'auto',
                  }}
                >
                  <button type="button" onClick={() => setI(n)} aria-current={n === i ? 'true' : undefined} aria-label={`${c.role}, ${c.company}, ${c.period}`}>
                    <span className="fan-no" aria-hidden="true">
                      {c.no}
                    </span>
                    <span className="fan-text" aria-hidden="true">
                      <b>{c.role}</b>
                      <small>{c.period}</small>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
      <a className="side-tab" href={`https://github.com/${profile.githubUser}`} target="_blank" rel="noreferrer">
        Read more
        <span className="sr-only"> on GitHub (opens in a new tab)</span>
      </a>
    </Slide>
  )
}

export default memo(Journey)
