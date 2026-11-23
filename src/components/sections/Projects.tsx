import { memo, useState } from 'react'
import { projects } from '../../data/site'
import Clip from '../Clip'
import { ArrowUpRight, Chevron } from '../Icons'
import Slide from '../Slide'

// Coverflow layout (matches the reference): active at scale 1, neighbours shrink and tuck behind.
const SCALE = [1, 0.84, 0.68, 0.52]
const SHIFT = [0, 0.92, 1.62, 2.12] // in card widths
const DROP = [0, 0, 5, 0] // vh

function Projects() {
  const [i, setI] = useState(0)
  const N = projects.length
  const go = (n: number) => setI(((n % N) + N) % N)
  const cur = projects[i]

  return (
    <Slide id="projects" title="Projects" className="slide-pale slide-gameplay">
      <div
        className="carousel"
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(i + 1)
          if (e.key === 'ArrowLeft') go(i - 1)
        }}
      >
        <ul className="flow enter" data-enter="up">
          {projects.map((p, n) => {
            // shortest signed distance on the loop, so cards appear on both sides of the active one
            let d = (((n - i) % N) + N) % N
            if (d > N / 2) d -= N
            const a = Math.min(Math.abs(d), 3)
            const sign = d < 0 ? -1 : 1
            return (
              <li
                key={p.title}
                style={{
                  transform: `translateX(calc(-50% + ${sign * SHIFT[a]} * var(--w))) translateY(${DROP[a]}vh) scale(${SCALE[a]})`,
                  zIndex: 10 - a,
                  opacity: Math.abs(d) > 3 ? 0 : 1,
                  pointerEvents: Math.abs(d) > 3 ? 'none' : 'auto',
                }}
              >
                <button
                  type="button"
                  className="card"
                  onClick={() => setI(n)}
                  aria-label={`${p.title}${n === i ? ' (selected)' : ''}`}
                  aria-current={n === i ? 'true' : undefined}
                  tabIndex={n === i ? 0 : -1}
                >
                  {/* square card, 16:9 shot: crop a little left of centre so a board-style game keeps its board in view */}
                  <span className="card-cover" style={{ background: p.image ? `url(${p.image}) 25% center / cover` : p.cover }}>
                    {!p.image && <em aria-hidden="true">{p.title}</em>}
                    {p.video && n === i && <Clip slide="projects" src={p.video} poster={p.image} className="card-video" />}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="car-controls enter" data-enter="up" style={{ ['--i' as string]: 1 }}>
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous project">
            <Chevron dir="left" />
          </button>
          <span aria-live="polite">
            {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next project">
            <Chevron />
          </button>
        </div>

        <div className="car-detail enter" data-enter="up" style={{ ['--i' as string]: 2 }} aria-live="polite">
          <p className="mini-title">
            {cur.kind} · {cur.year}
          </p>
          <h3>{cur.title}</h3>
          <p>{cur.summary}</p>
          <ul className="tags">
            {cur.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="car-links">
            {cur.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
                <span className="sr-only"> — {cur.title} (opens in a new tab)</span> <ArrowUpRight />
              </a>
            ))}
          </p>
        </div>
      </div>
    </Slide>
  )
}

export default memo(Projects)
