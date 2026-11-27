import { memo } from 'react'
import { profile } from '../data/site'
import { openMail } from '../lib/mail'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <p className="logo-word">{profile.wordmark}</p>
        <p className="footer-line">{profile.footerLine}</p>
        <p className="footer-copy">{profile.copyright}</p>
      </div>
      <ul className="footer-links">
        <li>
          <a href={`https://github.com/${profile.githubUser}`} target="_blank" rel="noreferrer">
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href={`mailto:${profile.email}`} onClick={openMail(profile.email)}>
            Contact
            <span className="sr-only"> (opens your email)</span>
          </a>
        </li>
        <li>
          <a href="#home">Back to top</a>
        </li>
      </ul>
    </footer>
  )
}

export default memo(Footer)
