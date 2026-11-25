import { useEffect, useRef, useState } from 'react'
import { isGameHref as isGame, profile, type UpdateItem } from '../data/site'
import { isReduced } from '../lib/motion'
import Overlay from './Overlay'

const TABS = ['Latest', 'Games', 'Other'] as const
type Tab = (typeof TABS)[number]
const PER_PAGE = 6

const fmt = (d: string) => {
  const [y, m, day] = d.split('.')
  return y && m && day ? `${Number(m)}/${Number(day)}/${y}` : d
}

/** Full "news" page: tabs, a two-column list with thumbnails, and numbered pagination. */
export default function UpdatesArchive({ items, onClose }: { items: UpdateItem[]; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('Latest')
  const [page, setPage] = useState(1)
  const [busy, setBusy] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  /** The reference flashes a spinner between list pages; do the same (skipped when animations are off). */
  const flash = () => {
    if (isReduced()) return
    setBusy(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setBusy(false), 420)
  }

  const list = items.filter((u) => (tab === 'Latest' ? true : tab === 'Games' ? isGame(u.href) : !isGame(u.href)))
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const p = Math.min(page, pages)
  const shown = list.slice((p - 1) * PER_PAGE, p * PER_PAGE)

  return (
    <Overlay title="All updates" onClose={onClose}>
      <div className="archive-tabs" role="group" aria-label="Update categories">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => {
              flash()
              setTab(t)
              setPage(1)
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={`archive-stage ${busy ? 'is-busy' : ''}`}>
      {shown.length === 0 ? (
        <p className="archive-empty">Nothing here yet.</p>
      ) : (
        <ul className="archive-list">
          {shown.map((u) => (
            <li key={u.href + u.title}>
              <a href={u.href} target="_blank" rel="noreferrer">
                <span className="archive-thumb" style={{ background: u.cover }} aria-hidden="true" />
                <span className="archive-text">
                  <small>
                    {u.tag} · <time>{fmt(u.date)}</time>
                  </small>
                  <b>{u.title}</b>
                  <em>
                    Read more + <span className="sr-only">(opens in a new tab)</span>
                  </em>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <span className="archive-spinner" aria-hidden="true" />
      </div>

      <nav className="archive-pages" aria-label="Pagination">
        <button
          type="button"
          onClick={() => {
            flash()
            setPage(p - 1)
          }}
          disabled={p <= 1}
        >
          ‹ Previous
        </button>
        <ol>
          {Array.from({ length: pages }, (_, n) => (
            <li key={n}>
              <button type="button" aria-current={n + 1 === p ? 'page' : undefined} onClick={() => {
                flash()
                setPage(n + 1)
              }} aria-label={`Page ${n + 1}`}>
                {String(n + 1).padStart(2, '0')}
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => {
            flash()
            setPage(p + 1)
          }}
          disabled={p >= pages}
        >
          Next ›
        </button>
      </nav>

      <a className="archive-github" href={`https://github.com/${profile.githubUser}`} target="_blank" rel="noreferrer">
        All repositories on GitHub +<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Overlay>
  )
}
