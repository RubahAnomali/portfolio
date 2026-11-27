import { memo } from 'react'
import { profile, socials } from '../data/site'
import { openMail } from '../lib/mail'
import { SocialIcon } from './Icons'

/**
 * Right-hand strip, laid out like the reference: a stepped hatched block at the top, a column of social
 * icons, then hatched blocks (plain and sloping) ending in a curved piece.
 * Slots without a link look the same but are not clickable.
 */
function SocialRail() {
  return (
    <aside className="rail" aria-label="Social links">
      <span className="rail-top" aria-hidden="true" />
      <ul className="rail-icons">
        {socials.map((s) => (
          <li key={s.label}>
            {s.href ? (
              <a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={s.label} title={s.label} onClick={s.icon === 'mail' ? openMail(profile.email) : undefined}>
                <SocialIcon icon={s.icon} size={26} />
              </a>
            ) : (
              <span className="rail-icon-off" aria-hidden="true">
                <SocialIcon icon={s.icon} size={26} />
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="rail-deco" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i className="rail-arc" />
      </div>
    </aside>
  )
}

export default memo(SocialRail)
