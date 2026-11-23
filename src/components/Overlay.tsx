import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  title: string
  onClose: () => void
  children: ReactNode
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Full-screen sub-page (like the reference's roster and news pages).
 * Modal dialog: Esc or backdrop closes, Tab stays inside, focus returns to the opener,
 * and the one-slide-per-wheel behaviour is paused while it is open.
 */
export default function Overlay({ title, onClose, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const close = useRef(onClose)
  useEffect(() => {
    close.current = onClose
  })

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    document.body.dataset.overlay = '1'
    document.body.style.overflow = 'hidden'
    ref.current?.querySelector<HTMLElement>('.overlay-close')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        close.current()
        return
      }
      if (e.key !== 'Tab' || !ref.current) return
      const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      delete document.body.dataset.overlay
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [])

  return createPortal(
    <div className="overlay" role="dialog" aria-modal="true" aria-label={title} ref={ref} onMouseDown={(e) => e.target === e.currentTarget && close.current()}>
      <div className="overlay-frame">
        <i className="overlay-mark m-tl" aria-hidden="true" />
        <i className="overlay-mark m-tr" aria-hidden="true" />
        <i className="overlay-mark m-bl" aria-hidden="true" />
        <i className="overlay-mark m-br" aria-hidden="true" />
        <header className="overlay-head">
          <h2>{title}</h2>
          <button type="button" className="overlay-close" onClick={() => close.current()} aria-label={`Close ${title}`}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>
        <div className="overlay-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
