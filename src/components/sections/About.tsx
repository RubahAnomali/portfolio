import { memo, useState } from 'react'
import { profile, roster } from '../../data/site'
import Overlay from '../Overlay'
import Slide from '../Slide'

/** Character-style page: stars, name, class, art, attributes, and an operator roster to switch facets. */
function About() {
  const [view, setView] = useState<'profile' | 'stats'>('profile')
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const cur = roster[idx]

  return (
    <Slide id="about" title="About" className="slide-pale">
      <div className="about">
        <div className="about-info enter" data-enter="up">
          <p className="stars" aria-label={`Rank ${profile.rank} of 5`}>
            {'★'.repeat(profile.rank)}
          </p>
          <h3 className="about-name">{profile.name}</h3>
          <hr className="rule" />
          <p className="about-class">{cur.class}</p>

          {view === 'profile' ? (
            <div className="about-copy" key={`${cur.id}-p`}>
              {cur.bio.map((p) => (
                <p key={p} className="about-bio">
                  {p}
                </p>
              ))}
              <p className="about-meta">{profile.codeVoice}</p>
            </div>
          ) : (
            <dl className="about-copy stats" key={`${cur.id}-s`}>
              {cur.stats.map((s) => (
                <div key={s.label} className="stat">
                  <dt>{s.label}</dt>
                  <dd>
                    <span className="stat-bar" aria-hidden="true">
                      <i style={{ width: `${s.value}%` }} />
                    </span>
                    <b>{s.value}</b>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="switcher" role="group" aria-label="Profile view">
            <button type="button" aria-pressed={view === 'profile'} onClick={() => setView('profile')}>
              Profile
            </button>
            <button type="button" aria-pressed={view === 'stats'} onClick={() => setView('stats')}>
              Attributes
            </button>
            <span className="switcher-bar" aria-hidden="true">
              <i style={{ transform: `translateX(${view === 'profile' ? 0 : 100}%)` }} />
            </span>
          </div>
        </div>

        <div className="about-stage enter" data-enter="left" style={{ ['--i' as string]: 2 }} aria-hidden={profile.photo ? undefined : true}>
          {/* the frame is the ledge the figure sits on: its top edge is at the figure's seat */}
          <div className="white-square" aria-hidden="true" />
          {/* the art re-enters from the left whenever another facet is picked */}
          <div className="stage-art" key={cur.id}>
            {/* an open hexagon behind the figure that rises above the frame and reaches down into it, and wings that run
                out past the frame's sides */}
            <svg className="stage-deco" viewBox="0 0 528 346" aria-hidden="true" focusable="false">
              <path className="deco-line" d="M94 173H10M434 173H518" />
              <path className="deco-hex-in" d="M178 266L124 173L194 51.8H334L404 173L350 266" />
              <path className="deco-hex" d="M149 266L94 173L179 25.8H349L434 173L379 266" />
              <path className="deco-chev" d="M66 153L48 173L66 193M38 153L20 173L38 193M462 153L480 173L462 193M490 153L508 173L490 193" />
              {['94,173', '179,25.8', '349,25.8', '434,173'].map((p) => (
                <circle key={p} className="deco-dot" cx={p.split(',')[0]} cy={p.split(',')[1]} r="5" />
              ))}
            </svg>
            {profile.photo ? (
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} />
            ) : (
              <svg viewBox="0 0 300 420" className="portrait-ph" aria-hidden="true">
                <circle cx="150" cy="120" r="62" />
                <path d="M30 420c0-110 52-170 120-170s120 60 120 170z" />
              </svg>
            )}
          </div>
        </div>

        <div className="roster enter" data-enter="right" style={{ ['--i' as string]: 3 }}>
          <ul className="roster-grid" aria-label="Profile facets">
            {roster.map((r, n) => (
              <li key={r.id}>
                <button type="button" className="roster-tile" aria-pressed={n === idx} onClick={() => setIdx(n)} aria-label={`${r.short}: ${r.label}`} title={r.label}>
                  <span aria-hidden="true">{r.short}</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="more-plus" onClick={() => setOpen(true)} aria-haspopup="dialog">
            More +
          </button>
        </div>
      </div>

      {open && (
        <Overlay title="Profile roster" onClose={() => setOpen(false)}>
          <ul className="roster-cards">
            {roster.map((r, n) => (
              <li key={r.id}>
                <button
                  type="button"
                  className="roster-card"
                  aria-pressed={n === idx}
                  onClick={() => {
                    setIdx(n)
                    setOpen(false)
                  }}
                >
                  <span className="roster-card-short" aria-hidden="true">
                    {r.short}
                  </span>
                  <span className="roster-card-text">
                    <b>{r.label}</b>
                    <small>{r.class}</small>
                    <span>{r.blurb}</span>
                  </span>
                  <span className="roster-card-stats" aria-hidden="true">
                    {r.stats.map((s) => (
                      <i key={s.label} style={{ width: `${s.value}%` }} />
                    ))}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Overlay>
      )}
    </Slide>
  )
}

export default memo(About)
