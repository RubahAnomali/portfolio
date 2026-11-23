import { useContext, type ReactNode } from 'react'
import { ActiveContext } from '../context/ActiveContext'

interface Props {
  id: string
  title: string
  className?: string
  /** Use level 1 for the single page heading (the hero). */
  level?: 1 | 2
  children: ReactNode
}

/** A full-screen "slide": one section of the single-page flow. Gets `is-active` while any part is on screen. */
export default function Slide({ id, title, className = '', level = 2, children }: Props) {
  const active = useContext(ActiveContext).has(id)
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <section id={id} className={`slide ${className} ${active ? 'is-active' : ''}`} aria-labelledby={`${id}-h`}>
      <Heading id={`${id}-h`} className="sr-only">
        {title}
      </Heading>
      {children}
    </section>
  )
}
