import type { SVGProps } from 'react'
import type { Social } from '../data/site'

const base: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const Chevron = ({ dir = 'right' }: { dir?: 'left' | 'right' | 'down' }) => (
  <svg {...base} style={{ transform: `rotate(${dir === 'left' ? 180 : dir === 'down' ? 90 : 0}deg)` }}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)
export const DoubleChevron = () => (
  <svg {...base}>
    <path d="m6 6 6 6-6 6M13 6l6 6-6 6" />
  </svg>
)
export const ArrowUpRight = () => (
  <svg {...base}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)
export const Menu = ({ open }: { open: boolean }) => (
  <svg {...base} width={24} height={24}>
    {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
  </svg>
)

/** Solid white-style brand glyphs for the social rail. */
export function SocialIcon({ icon, size = 18 }: { icon: Social['icon']; size?: number }) {
  const solid: SVGProps<SVGSVGElement> = { ...base, width: size, height: size, fill: 'currentColor', stroke: 'none' }
  switch (icon) {
    case 'github':
      return (
        <svg {...solid}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.921.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...solid}>
          <path d="M3 5h18a1 1 0 0 1 1 1v.4l-10 6.3L2 6.4V6a1 1 0 0 1 1-1zm19 3.7V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.7l10 6.3z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...solid}>
          <path fillRule="evenodd" d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm7 2v6l5.2-3z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...solid}>
          <path fillRule="evenodd" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1.8 7.2V18h2.6v-7.8zM7.1 6.2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10.2 10.2V18h2.5v-4c0-1.1.5-1.8 1.5-1.8s1.3.7 1.3 1.8V18h2.5v-4.5c0-2.2-1.2-3.5-3-3.5-1 0-1.8.5-2.3 1.2v-1z" />
        </svg>
      )
    case 'dribbble':
      return (
        <svg {...base} width={size} height={size} strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9.2" />
          <path d="M5.5 5.8c4.5 2.3 8.7 5.8 11.5 12.2M3.3 11.2c5.5.4 11.1-.2 15.4-3M8.4 20.4c1-4.4 3.6-8 7.5-10.4" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...solid}>
          <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4.6v-7h2.4l.4-2.8h-2.8V9.5c0-.8.3-1.4 1.5-1.4h1.4V5.6c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H9v2.8h2.7v7H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...base} width={size} height={size} strokeWidth={2.1}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'discord':
      return (
        <svg {...solid}>
          <path fillRule="evenodd" d="M6 4h12a3 3 0 0 1 3 3v13l-3-2.5-1.7 2h-3.8l-.5-1.6h-2l-.5 1.6H6.7L5 17.5 3 20V7a3 3 0 0 1 3-3zm3.2 6.2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zm5.6 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...solid}>
          <path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.3 6.3 0 1 0 5.3 6.2V8.7a7.9 7.9 0 0 0 4.4 1.4V6.8a4.7 4.7 0 0 1-4.4-4.8z" />
        </svg>
      )
    default:
      // X (formerly Twitter)
      return (
        <svg {...solid}>
          <path d="M18.9 2h3.2l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.8l7.5-8.6L2.4 2H9l4.5 6.6zm-1.1 18h1.8L7.3 3.9H5.4z" />
        </svg>
      )
  }
}
