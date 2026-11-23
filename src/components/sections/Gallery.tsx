import { memo, useState } from 'react'
import { galleryTabs, profile } from '../../data/site'
import Slide from '../Slide'

function Gallery() {
  const [tab, setTab] = useState(galleryTabs[0].id)
  const [switched, setSwitched] = useState(false)
  const cur = galleryTabs.find((t) => t.id === tab) ?? galleryTabs[0]
  return (
    <Slide id="gallery" title="Gallery" className="slide-pale slide-gallery">
      <div className="gallery">
        <div className="tabs enter" data-enter="up" role="group" aria-label="Gallery categories">
          {galleryTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={t.id === tab}
              onClick={() => {
                setSwitched(true)
                setTab(t.id)
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <ul className="g-grid" key={cur.id} data-fresh={switched} aria-label={cur.label}>
          {cur.items.slice(0, 6).map((g, n) => (
            <li key={g.title} className="enter" data-enter="up" style={{ ['--i' as string]: n + 1 }}>
              <figure>
                <div className="g-cover" style={{ background: g.image ? `url(${g.image}) center/cover` : g.cover }} />
                <figcaption>{g.title}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <a className="more-btn enter" data-enter="up" style={{ ['--i' as string]: 7 }} href={`https://github.com/${profile.githubUser}`} target="_blank" rel="noreferrer">
          More <span aria-hidden="true">▸</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </Slide>
  )
}

export default memo(Gallery)
