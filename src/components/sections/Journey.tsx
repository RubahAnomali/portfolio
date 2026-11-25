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
  const N = chapters.length
  const go = (n: number) => setI(((n % N) + N) % N) // the rotation loops: after the last chapter comes the first
  const cur = chapters[i]

  return (
    <Slide id="journey" title="Journey" className="slide-pale">
      <div className="journey">
        <div className="book-wrap enter" data-enter="left">
          <div className="book" key={cur.role}>
            {/* a picture, when the chapter has one, sits under a dark fade so the title stays readable */}
            <div className="book-cover" style={cur.image ? { background: `linear-gradient(to top, rgb(7 10 12 / 0.85), rgb(7 10 12 / 0.1) 65%), url(${cur.image}) center / cover` } : undefined}>
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
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous chapter">
              <Chevron dir="left" />
            </button>
            <span aria-hidden="true" />
            <button type="button" onClick={() => go(i + 1)} aria-label="Next chapter">
              <Chevron dir="right" />
            </button>
          </div>
          <ol className="fan">
            {chapters.map((c, n) => {
              // shortest signed distance on the loop, so cards show on both sides of the selected one
              let d = (((n - i) % N) + N) % N
              if (d > N / 2) d -= N
              const a = Math.min(Math.abs(d), 2)
              const f = FAN[a]
              const sign = d < 0 ? -1 : 1
              return (
                <li
                  key={c.role}
                  data-far={a === 2 ? 'true' : undefined}
                  style={{
                    transform: `translateY(calc(${d} * (var(--ch) + 1.4rem))) rotate(${f.r * -sign}deg) scale(${f.s}) translateX(${f.x}vw)`,
                    zIndex: 5 - a,
                    opacity: Math.abs(d) > 2 ? 0 : 1,
                    pointerEvents: Math.abs(d) > 2 ? 'none' : 'auto',
                  }}
                >
                  <button type="button" onClick={() => setI(n)} aria-current={n === i ? 'true' : undefined} aria-label={`${c.role} ${c.period}, ${c.company}`}>
                    <span className="fan-text" aria-hidden="true">
                      <b>{c.role}</b> <small>{c.period}</small>
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
