import type { MouseEvent } from 'react'

/** Gmail's compose window with the recipient filled in. */
export const gmailCompose = (to: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`

/**
 * A mailto: link does nothing on a computer with no mail app. On a computer (mouse pointer) open Gmail's compose
 * window in a new tab instead; on a phone leave the mailto: link alone, because the phone's mail app handles it.
 */
export const openMail = (to: string) => (e: MouseEvent) => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  e.preventDefault()
  window.open(gmailCompose(to), '_blank', 'noopener')
}
