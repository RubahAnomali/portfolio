import { memo, useState } from 'react'
import { isGameHref as isGame } from '../../data/site'
import { useGithubUpdates } from '../../hooks/useGithubUpdates'
import Clip from '../Clip'
import { DoubleChevron } from '../Icons'
import Slide from '../Slide'
import UpdatesArchive from '../UpdatesArchive'

const TABS = ['Latest', 'Games', 'Other'] as const
type Tab = (typeof TABS)[number]

/** 2026.11.24 -> 11/24/2026 */
const fmt = (d: string) => {
  const [y, m, day] = d.split('.')
  return y && m && day ? `${Number(m)}/${Number(day)}/${y}` : d
}

function Updates() {
  const { items: all, live } = useGithubUpdates()
  const [tab, setTab] = useState<Tab>('Latest')
  const [idx, setI] = useState(0)
  const [archive, setArchive] = useState(false)

  const filtered = all.filter((u) => (tab === 'Latest' ? true : tab === 'Games' ? isGame(u.href) : !isGame(u.href)))
  const list = filtered.slice(0, 5)
  const i = Math.min(idx, Math.max(list.length - 1, 0))
  const cur = list[i] ?? all[0]

  return (
    <Slide id="updates" title="Updates" className="slide-pale">
      <div className="updates">
        <div className="feature enter" data-enter="left" role="group" aria-roledescription="carousel" aria-label="Featured updates">
          <a href={cur.href} target="_blank" rel="noreferrer" className="feature-card" style={{ background: cur.image ? `url(${cur.image}) center/cover` : cur.cover }}>
            {cur.video && <Clip key={cur.video} slide="updates" src={cur.video} poster={cur.image} className="feature-video" />}
            <span className="feature-bar">
              <span className="feature-title">{cur.title}</span>
              <span className="read">
                Read <DoubleChevron />
              </span>
            </span>
          </a>
          <div className="feature-dots" role="group" aria-label="Choose update">
            {list.map((u, n) => (
              <button key={u.title} type="button" className={n === i ? 'is-on' : ''} aria-label={`Show: ${u.title}`} aria-pressed={n === i} onClick={() => setI(n)} />
            ))}
          </div>
          <span className="feature-decor" aria-hidden="true" />
        </div>

        <div className="latest enter" data-enter="right" style={{ ['--i' as string]: 1 }}>
          <div className="latest-tabs" role="group" aria-label="Update categories">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tab === t}
                className={tab === t ? 'is-on' : ''}
                onClick={() => {
                  setTab(t)
                  setI(0)
                }}
              >
                {t === 'Latest' && <DoubleChevron />}
                {t === 'Latest' && live ? 'Latest' : t}
              </button>
            ))}
          </div>
          <ul className="latest-list">
            {list.length === 0 && <li className="latest-empty">Nothing here yet.</li>}
            {list.map((u, n) => (
              <li key={u.title}>
                <a href={u.href} target="_blank" rel="noreferrer" onMouseEnter={() => setI(n)} onFocus={() => setI(n)} aria-current={n === i ? 'true' : undefined}>
                  <span className="latest-title">{u.title}</span>
                  <time>{fmt(u.date)}</time>
                </a>
              </li>
            ))}
          </ul>
          <span className="latest-base" aria-hidden="true" />
          <button type="button" className="read-more" onClick={() => setArchive(true)} aria-haspopup="dialog">
            Read more +
          </button>
        </div>
      </div>
      {archive && <UpdatesArchive items={all} onClose={() => setArchive(false)} />}
    </Slide>
  )
}

export default memo(Updates)
