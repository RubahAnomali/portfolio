import { memo, useEffect, useState } from 'react'
import { skillNodes } from '../../data/site'
import Slide from '../Slide'

// Fine-grained hex landmass: a flat plateau with raised columns, like the reference map.
const R = 11
const COLS = 40
const ROWS = 26
const SIDE = 4
const RISE = 5
const HW = R * Math.sqrt(3)
const W = HW * COLS
const H = R * 2 + R * 1.5 * (ROWS - 1) + SIDE + RISE

const center = (col: number, row: number): [number, number] => [HW * (col + (row % 2) / 2) + HW / 2, R + RISE + R * 1.5 * row]
const hexPoints = (cx: number, cy: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 180) * (60 * k - 30)
    return `${(cx + (R - 0.8) * Math.cos(a)).toFixed(1)},${(cy + (R - 0.8) * Math.sin(a)).toFixed(1)}`
  }).join(' ')

/** Irregular coastline: radius limit as a function of angle. */
const limit = (a: number) => 0.8 + 0.1 * Math.sin(3 * a + 1) + 0.06 * Math.sin(5 * a + 2) + 0.04 * Math.sin(9 * a)

interface Tile {
  key: string
  cx: number
  cy: number
  up: 0 | 1 | null
  /** 0 centre .. 1 edge: delay of the rising-column reveal */
  d: number
}

function buildTiles(): Tile[] {
  const out: Tile[] = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const [cx, cy] = center(col, row)
      const dx = (cx - W / 2) / (W / 2)
      const dy = (cy - H / 2) / (H / 2)
      const r = Math.hypot(dx, dy)
      const lim = limit(Math.atan2(dy, dx))
      if (r > lim) continue
      const n = Math.sin(col * 0.55 + row * 0.31) * Math.cos(col * 0.23 - row * 0.47)
      const raised = r < lim - 0.08 && n > -0.15
      out.push({ key: `${col}-${row}`, cx, cy, up: raised ? (((col * 3 + row * 7) % 5) % 2 === 0 ? 0 : 1) : null, d: Math.min(1, r) })
    }
  }
  return out
}

const TILES = buildTiles()

/** The map itself. Static, so it is memoised: re-rendering ~2,800 polygons on every scroll update made page moves stutter. */
const HexSvg = memo(function HexSvg() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      {TILES.map((t) => (
        <g key={t.key} className="tile" style={{ ['--d' as string]: Math.round(t.d * 700) }}>
          <polygon points={hexPoints(t.cx, t.cy + SIDE)} className="hex-base-side" />
          <polygon points={hexPoints(t.cx, t.cy)} className="hex-base" />
          {t.up !== null && (
            <>
              <polygon points={hexPoints(t.cx, t.cy)} className="hex-up-side" />
              <polygon points={hexPoints(t.cx, t.cy - RISE)} className={`hex-up hex-up-${t.up}`} />
            </>
          )}
        </g>
      ))}
    </svg>
  )
})

/** "Discover" slide: click to reveal the skill regions on the map. */
function Skills() {
  const [discovered, setDiscovered] = useState(false)
  const [activeId, setActiveId] = useState(skillNodes[0].id)
  const active = skillNodes.find((n) => n.id === activeId) ?? skillNodes[0]
  // desktop: the dossier opens from "Check more"; on small screens it is always shown
  const [dossier, setDossier] = useState(() => window.matchMedia('(max-width: 960px)').matches)

  useEffect(() => {
    if (!dossier) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !document.body.dataset.overlay && setDossier(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [dossier])


  return (
    <Slide id="skills" title="Skills" className="slide-discover">
      <div className="map" data-discovered={discovered}>
        <div className="map-canvas enter" data-enter="up" style={{ aspectRatio: `${W} / ${H}`, ['--ratio' as string]: (W / H).toFixed(3) }}>
          {/* the map tips back into a 3D view once discovered, like the reference's map app */}
          <div className="map-tilt">
          <HexSvg />
          {discovered && (
            <ul className="map-nodes">
              {skillNodes.map((n) => {
                const [cx, cy] = center(Math.round(5 + (n.col - 2) * (16 / 7)), Math.round((n.row * ROWS) / 8))
                return (
                  <li key={n.id} style={{ left: `${(cx / W) * 100}%`, top: `${(cy / H) * 100}%` }}>
                    <button type="button" className="node" aria-pressed={n.id === activeId} onClick={() => setActiveId(n.id)}>
                      <span>{n.title}</span>
                    </button>
                    {n.id === activeId && (
                      <div className="ribbon" key={n.id}>
                        <span className="ribbon-title">{n.title}</span>
                        <button type="button" className="ribbon-more" onClick={() => setDossier(true)} aria-expanded={dossier}>
                          Check more
                        </button>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          </div>
        </div>

        {!discovered && (
          <button type="button" className="discover" onClick={() => setDiscovered(true)}>
            <span>Click to Discover Skills</span>
          </button>
        )}

        {discovered && (
          <ul className="region-tabs" aria-label="Skill regions">
            {skillNodes.map((n) => (
              <li key={n.id}>
                <button type="button" aria-pressed={n.id === activeId} onClick={() => setActiveId(n.id)}>
                  {n.title}
                </button>
              </li>
            ))}
          </ul>
        )}

        {discovered && (
          <aside className="skill-panel" data-open={dossier} inert={!dossier} aria-label={`${active.title} dossier`}>
            <button type="button" className="panel-close" onClick={() => setDossier(false)} aria-label="Close dossier">
              ✕
            </button>
            <p className="mini-title">Region dossier</p>
            <h3>{active.title}</h3>
            <p>{active.blurb}</p>
            <ul className="tags">
              {active.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </Slide>
  )
}

export default memo(Skills)
