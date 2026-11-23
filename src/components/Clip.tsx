import { useContext } from 'react'
import { ActiveContext } from '../context/ActiveContext'
import { isReduced } from '../lib/motion'

/**
 * Muted, looping gameplay clip. It mounts only while its slide (`slide` = the slide id) is in view, so it loads
 * and plays only then, and never when animations are off. The still behind it (the poster) is the fallback.
 * It loops, unless `onEnded` is given: then it plays once and calls it (the hero uses that to move on to the next game).
 */
export default function Clip({ src, poster, slide, className, onEnded }: { src: string; poster?: string; slide: string; className: string; onEnded?: () => void }) {
  const onScreen = useContext(ActiveContext).has(slide)
  if (!onScreen || isReduced()) return null
  return <video className={className} src={src} poster={poster} autoPlay muted loop={!onEnded} onEnded={onEnded} playsInline preload="auto" aria-hidden="true" tabIndex={-1} />
}
