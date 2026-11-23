import { useEffect, useState } from 'react'

export interface SectionState {
  /** The slide that is most in view (drives the nav underline and the hash). */
  active: string
  /** Every slide that is at least partly on screen (drives entrance animations). */
  visible: ReadonlySet<string>
}

const sameSet = (a: ReadonlySet<string>, b: ReadonlySet<string>) => a.size === b.size && [...a].every((x) => b.has(x))

/**
 * Tracks which slides are in view.
 * `visible` includes a slide as soon as any part of it is on screen, so its content can start moving
 * in while the page is still travelling, and it only leaves once the slide is fully off screen.
 */
export function useActiveSection(ids: string[]): SectionState {
  const [active, setActive] = useState(ids[0])
  const [visible, setVisible] = useState<ReadonlySet<string>>(() => new Set([ids[0]]))

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)

    // most visible slide
    const ratios = new Map<string, number>()
    const ioActive = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best = ''
        let max = 0
        ratios.forEach((r, id) => {
          if (r > max) {
            max = r
            best = id
          }
        })
        if (best) setActive(best)
      },
      { threshold: [0, 0.5] },
    )

    // any slide that is (nearly) on screen
    const seen = new Set<string>()
    const ioVisible = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)))
        setVisible((prev) => (sameSet(prev, seen) ? prev : new Set(seen)))
      },
      // shrunk by 2px so a neighbour merely touching the screen edge (as at rest) does not count as visible
      { rootMargin: '-2px 0px -2px 0px', threshold: 0 },
    )

    els.forEach((el) => {
      ioActive.observe(el)
      ioVisible.observe(el)
    })
    return () => {
      ioActive.disconnect()
      ioVisible.disconnect()
    }
  }, [ids])

  return { active, visible }
}
