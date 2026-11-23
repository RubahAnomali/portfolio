import { navItems } from '../data/site'

/** Fixed HUD lines: vertical rail line, corner squares, and the bottom "SCROLL" cue. */
export default function Frame({ active }: { active: string }) {
  const idx = navItems.findIndex((n) => n.id === active)
  const next = navItems[idx + 1]
  return (
    <>
      <div className="frame" aria-hidden="true">
        <i className="frame-v" />
        <i className="frame-sq frame-sq-top" />
        <i className="frame-sq frame-sq-bottom" />
      </div>
      {next && (
        <a className="scroll-cue" href={`#${next.id}`}>
          <span>Scroll</span>
          <i aria-hidden="true" />
          <span className="sr-only"> to {next.label}</span>
        </a>
      )}
    </>
  )
}
