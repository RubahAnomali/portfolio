import { useEffect } from 'react'
import { isReduced } from '../lib/motion'

/**
 * Page moves are animated with a CSS transform on a wrapper (#flow), like the reference site, not by
 * scrolling from JavaScript on every frame. A transform transition runs on the browser's compositor, so
 * it stays smooth even when the main thread is busy; per-frame scrollTo depends on the main thread and
 * visibly stuttered in Brave.
 *
 * How: jump the real scroll position to the target at once, then shift #flow back by the same distance
 * and let CSS slide it to 0. The user sees the old page glide away and the new one glide in.
 */
/**
 * Same timing as the reference site, measured on arknights.global: its page container is moved with
 * `transition: 0.4s ease-in-out` on a translate3d. Change DURATION to tune the speed (ms).
 */
const EASE = 'ease-in-out'
const DURATION = 400
/** Trips longer than this many screens slide in only one screen (with a fade) instead of dragging the whole page past. */
const FAR = 3

/** If `transitionend` never arrives (tab hidden, no frames drawn), clear the move after DURATION + this (ms). */
const BACKUP = 300

let timer = 0
let onEnd: ((e: TransitionEvent) => void) | undefined
const root = () => document.documentElement
const flowEl = () => document.getElementById('flow')
const maxScroll = () => Math.max(0, root().scrollHeight - window.innerHeight)

/** Current visual offset of #flow while it is mid-slide. */
const currentOffset = (flow: HTMLElement) => {
  const t = getComputedStyle(flow).transform
  return t && t !== 'none' ? new DOMMatrix(t).m42 : 0
}

function settle(flow: HTMLElement | null) {
  window.clearTimeout(timer)
  if (flow) {
    if (onEnd) flow.removeEventListener('transitionend', onEnd)
    onEnd = undefined
    flow.style.transition = ''
    flow.style.transform = ''
    flow.style.opacity = ''
  }
  root().classList.remove('is-moving')
}

/** Animated page move. Returns the duration in ms (0 when instant). */
export function scrollToY(y: number, reduced = false): number {
  const flow = flowEl()
  const from = window.scrollY
  const to = Math.max(0, Math.min(y, maxScroll()))
  // if a slide is still in flight, carry its remaining offset into the new move
  const inFlight = flow ? currentOffset(flow) : 0
  if (reduced || !flow || (Math.abs(to - from) < 2 && Math.abs(inFlight) < 2)) {
    settle(flow)
    window.scrollTo(0, to)
    return 0
  }

  const vh = window.innerHeight
  const delta = to - from
  const screens = Math.abs(delta) / vh
  const far = screens > FAR
  const offset = (far ? Math.sign(delta) * vh : delta) + inFlight

  settle(flow) // drops the previous move's timer and listener; the lines below set a fresh start state
  root().classList.add('is-moving')
  window.scrollTo(0, to) // the real position changes at once...
  flow.style.transition = 'none'
  flow.style.transform = `translate3d(0, ${offset}px, 0)` // ...while the page still looks like it is at the old place
  if (far) flow.style.opacity = '0'
  void flow.offsetHeight // commit that starting state
  flow.style.transition = `transform ${DURATION}ms ${EASE}${far ? `, opacity ${Math.round(DURATION * 0.55)}ms ease-out` : ''}`
  flow.style.transform = 'translate3d(0, 0, 0)'
  if (far) flow.style.opacity = '1'
  // Finish when the browser says the slide ended, not on a clock that started before the animation did.
  onEnd = (e) => {
    if (e.target === flow && e.propertyName === 'transform') settle(flow)
  }
  flow.addEventListener('transitionend', onEnd)
  timer = window.setTimeout(() => settle(flow), DURATION + BACKUP)
  return DURATION
}

interface Stop {
  y: number
  /** The slide that starts here (null for the final "end of page" stop). */
  el: HTMLElement | null
}

/**
 * Where one wheel tick can land. Positions are clamped to the real maximum scroll and de-duplicated:
 * on tall screens the last slide is shorter than the viewport, so its top is not reachable and
 * must share a stop with the bottom of the page (otherwise you get stuck at the bottom).
 */
function getStops(ids: string[]): Stop[] {
  const max = maxScroll()
  const out: Stop[] = []
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = Math.min(el.offsetTop, max)
    const last = out[out.length - 1]
    if (last && Math.abs(last.y - y) < 2) last.el = el
    else out.push({ y, el })
  })
  const last = out[out.length - 1]
  if (!last || max - last.y > 8) out.push({ y: max, el: null }) // footer area below the last slide
  return out
}

const currentIndex = (stops: Stop[]) => {
  let idx = 0
  stops.forEach((s, i) => {
    if (window.scrollY >= s.y - 8) idx = i
  })
  return idx
}

const isEditable = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
const isInteractive = (el: EventTarget | null) =>
  el instanceof HTMLElement && !!el.closest('button, a, input, textarea, select, summary, [role="tab"], [role="slider"]')

/** In a slide taller than the screen, scroll natively until its edge is reached. */
const insideTallSlide = (stop: Stop | undefined, dir: 1 | -1) => {
  const el = stop?.el
  if (!el || el.offsetHeight <= window.innerHeight + 8) return false
  const atEnd = window.scrollY + window.innerHeight >= el.offsetTop + el.offsetHeight - 2
  const atStart = window.scrollY <= el.offsetTop + 2
  return (dir > 0 && !atEnd) || (dir < 0 && !atStart)
}

/**
 * Full-page flow like the reference: one wheel tick / key press moves exactly one slide.
 * - Only on desktop-size screens without reduced-motion; elsewhere native scrolling stays.
 * - Slides taller than the viewport scroll natively until their edge is reached.
 * - Anchor links (#id) animate the same way and move focus to the target for keyboard users.
 */
export function usePageScroll(ids: string[]) {
  useEffect(() => {
    const mqDesk = window.matchMedia('(min-width: 961px)')
    let locked = false
    let lastTs = 0
    let lastDelta = 0

    const active = () => mqDesk.matches && !isReduced() && !document.body.dataset.overlay
    const move = (to: number) => {
      locked = true
      const ms = scrollToY(to, isReduced())
      window.setTimeout(() => (locked = false), ms + 150) // unlock just after the page has landed
    }

    /** Target stop for a step in `dir`, or null when already at the edge. */
    const target = (dir: 1 | -1): number | null => {
      const stops = getStops(ids)
      const i = currentIndex(stops)
      if (insideTallSlide(stops[i], dir)) return null
      // moving up from the middle of a slide returns to that slide's top first
      if (dir < 0 && window.scrollY > stops[i].y + 8) return stops[i].y
      const next = Math.max(0, Math.min(stops.length - 1, i + dir))
      return Math.abs(stops[next].y - window.scrollY) < 2 ? null : stops[next].y
    }

    const onWheel = (e: WheelEvent) => {
      if (!active() || e.ctrlKey || Math.abs(e.deltaY) < 6) return
      const now = performance.now()
      const gap = now - lastTs
      const prev = lastDelta
      lastTs = now
      lastDelta = Math.abs(e.deltaY)
      if (locked) {
        e.preventDefault()
        return
      }
      // Trackpad inertia: a continuous, decaying stream right after a move is not a new gesture.
      if (gap < 90 && Math.abs(e.deltaY) <= prev) {
        e.preventDefault()
        return
      }
      const to = target(e.deltaY > 0 ? 1 : -1)
      if (to === null) return // at the edge, or scrolling natively inside a tall slide
      e.preventDefault()
      move(to)
    }

    const onKey = (e: KeyboardEvent) => {
      if (!active() || isEditable(e.target) || e.altKey || e.ctrlKey || e.metaKey) return
      let to: number | null | undefined
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (locked) return e.preventDefault()
        to = target(e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1)
      } else if (e.key === ' ' && !isInteractive(e.target)) {
        if (locked) return e.preventDefault()
        to = target(e.shiftKey ? -1 : 1)
      } else if (e.key === 'Home' || e.key === 'End') {
        const stops = getStops(ids)
        to = e.key === 'Home' ? stops[0].y : stops[stops.length - 1].y
      } else return
      if (to === null || to === undefined) return
      e.preventDefault()
      move(to)
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      const id = a?.getAttribute('href')?.slice(1)
      const dest = id ? document.getElementById(id) : null
      if (!a || !dest) return
      e.preventDefault()
      scrollToY(dest.offsetTop, isReduced())
      history.replaceState(null, '', `#${id}`)
      dest.setAttribute('tabindex', '-1')
      dest.focus({ preventScroll: true })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
      settle(flowEl())
    }
  }, [ids])
}
