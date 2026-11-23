import { useEffect, useRef } from 'react'

/**
 * Keeps the address bar in step with the slide in view, and restores the position on load.
 * (Without this the URL only changed when a nav link was clicked, so it went stale while scrolling
 * and a reload could land somewhere else.)
 */
export function useHashSync(ids: string[], active: string) {
  const mountedAt = useRef(0)

  // On load: jump to the slide named in the URL. History restoration is replaced by this.
  useEffect(() => {
    mountedAt.current = performance.now()
    window.history.scrollRestoration = 'manual'
    const id = window.location.hash.slice(1)
    const el = id && ids.includes(id) ? document.getElementById(id) : null
    if (el) window.scrollTo(0, Math.min(el.offsetTop, document.documentElement.scrollHeight - window.innerHeight))
  }, [ids])

  // While scrolling: write the current slide into the URL (no new history entries).
  useEffect(() => {
    if (performance.now() - mountedAt.current < 800) return // let the initial jump settle first
    const next = active === ids[0] ? window.location.pathname + window.location.search : `#${active}`
    const now = window.location.pathname + window.location.search + window.location.hash
    if (next !== now && !(active === ids[0] && !window.location.hash)) window.history.replaceState(null, '', next)
  }, [active, ids])
}
