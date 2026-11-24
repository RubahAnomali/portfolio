import { memo, useEffect, useState } from 'react'
import { profile, projects } from '../../data/site'
import Clip from '../Clip'
import Slide from '../Slide'

/** Crossfade length in ms; keep in step with the hero-clip-in / hero-clip-out animations in index.css. */
const FADE = 900
const noop = () => undefined

function Hero() {
  const [i, setI] = useState(0)
  const [out, setOut] = useState<number | null>(null) // the game whose clip is still fading out
  const p = projects[i]
  const show = (n: number) => {
    if (n === i) return
    setOut(i)
    setI(n)
  }
  useEffect(() => {
    if (out === null) return
    const t = window.setTimeout(() => setOut(null), FADE)
    return () => window.clearTimeout(t)
  }, [out])

  return (
    <Slide id="home" title={`${profile.name} — ${profile.role}`} className="slide-hero" level={1}>
      {/* Key-visual: the featured game's clip, dimmed, on black. When it ends the next game's clip fades in over it, round and round.
          The outgoing clip stays mounted (same key, so it keeps its last frame) until the fade is done.
          The bands and their light wave show only when no clip is (animations off, or a game without a clip). */}
      {(out === null ? [i] : [out, i]).map((n) => {
        const g = projects[n]
        return g.video ? (
          <Clip
            key={g.video}
            slide="home"
            src={g.video}
            poster={g.image}
            className={n === i ? 'hero-video' : 'hero-video is-out'}
            onEnded={n === i ? () => show((i + 1) % projects.length) : noop}
          />
        ) : null
      })}
      <div className="hero-bands" aria-hidden="true">
        {Array.from({ length: 12 }, (_, n) => (
          <span key={n} style={{ ['--n' as string]: n }} />
        ))}
      </div>

      <div className="hero-title enter" data-enter="left">
        <p className="hero-kicker">{profile.codename}</p>
        <p className="hero-word" aria-hidden="true">
          {profile.wordmark}
        </p>
        <p className="hero-tagline">{profile.tagline}</p>
      </div>

      <div className="hero-panel enter" data-enter="left" style={{ ['--i' as string]: 1 }}>
        {profile.resumeHref && (
          <a className="store" href={profile.resumeHref}>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
              <rect x="3" y="5" width="18" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M2 19h20" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>
              <small>Available as PDF</small>
              <strong>Download Résumé</strong>
            </span>
          </a>
        )}
        <div className="store-row">
          <a className="store store-sm" href="#projects">
            <span>
              <small>Play in browser</small>
              <strong>My Games</strong>
            </span>
          </a>
          <a className="store store-sm" href={`https://github.com/${profile.githubUser}`} target="_blank" rel="noreferrer">
            <span>
              <small>Find me on</small>
              <strong>GitHub</strong>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="hero-logo enter" data-enter="right" style={{ ['--i' as string]: 2 }}>
        <div className="pv-tabs" role="group" aria-label="Featured game">
          <p>Play</p>
          {projects.map((g, n) => {
            const num = String(n + 1).padStart(3, '0')
            return (
              <button
                key={g.title}
                type="button"
                className={n === i ? 'is-on' : ''}
                aria-pressed={n === i}
                aria-label={`${num}: ${g.title}`} /* starts with the visible number, so voice control ("click 001") works */
                onClick={() => show(n)}
              >
                {num}
              </button>
            )
          })}
        </div>
        <p className="logo-word">{p.title}</p>
        <a className="hero-play" href={p.links[0].href} target="_blank" rel="noreferrer">
          {p.links[0].label} now <span aria-hidden="true">›</span>
          <span className="sr-only"> {p.title} (opens in a new tab)</span>
        </a>
      </div>
    </Slide>
  )
}

export default memo(Hero)
