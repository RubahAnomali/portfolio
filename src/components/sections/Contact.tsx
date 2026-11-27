import { memo } from 'react'
import { profile, socials } from '../../data/site'
import { openMail } from '../../lib/mail'
import Slide from '../Slide'

function Contact() {
  return (
    <Slide id="contact" title="Contact" className="slide-pale slide-contact">
      <div className="contact">
        <p className="contact-kicker enter" data-enter="up">That’s all for now.</p>
        <h3 className="contact-title enter" data-enter="up" style={{ ['--i' as string]: 1 }}>
          Got a project in mind?
          <br />
          Let’s talk.
        </h3>
        <a className="discover discover-static enter" data-enter="up" style={{ ['--i' as string]: 2 }} href={`mailto:${profile.email}`} onClick={openMail(profile.email)}>
          <span>{profile.email}</span>
        </a>
        <ul className="contact-links enter" data-enter="up" style={{ ['--i' as string]: 3 }}>
          {socials
            .filter((s) => s.icon !== 'mail' && s.href)
            .map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </Slide>
  )
}

export default memo(Contact)
