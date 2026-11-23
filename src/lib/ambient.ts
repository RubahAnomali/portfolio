/**
 * A quiet generated ambient pad (no audio files): a few detuned oscillators through a slowly moving low-pass.
 * Browsers only allow sound after a user gesture, so the context is created on the first "on".
 */
type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext }

let ctx: AudioContext | null = null
let master: GainNode | null = null

const NOTES = [110, 164.81, 220, 261.63, 329.63] // A minor: A2 E3 A3 C4 E4
const LEVEL = 0.05

function build(c: AudioContext): GainNode {
  const out = c.createGain()
  out.gain.value = 0
  out.connect(c.destination)

  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 700
  filter.Q.value = 0.6
  filter.connect(out)

  // slow breathing of the filter
  const lfo = c.createOscillator()
  lfo.frequency.value = 0.06
  const lfoDepth = c.createGain()
  lfoDepth.gain.value = 320
  lfo.connect(lfoDepth)
  lfoDepth.connect(filter.frequency)
  lfo.start()

  NOTES.forEach((f, i) => {
    for (const detune of [-5, 5]) {
      const osc = c.createOscillator()
      osc.type = i % 2 ? 'triangle' : 'sine'
      osc.frequency.value = f
      osc.detune.value = detune
      const g = c.createGain()
      g.gain.value = 0.34 / (i + 1.5)
      osc.connect(g)
      g.connect(filter)
      osc.start()
    }
  })
  return out
}

/** Fade the ambient pad in. Returns false when the browser has no Web Audio. */
export function ambientOn(): boolean {
  const AC = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext
  if (!AC) return false
  if (!ctx) {
    ctx = new AC()
    master = build(ctx)
  }
  void ctx.resume()
  const now = ctx.currentTime
  master?.gain.cancelScheduledValues(now)
  master?.gain.setValueAtTime(master.gain.value, now)
  master?.gain.linearRampToValueAtTime(LEVEL, now + 2.5)
  return true
}

/** Fade out, then suspend the context so it costs nothing. */
export function ambientOff() {
  if (!ctx || !master) return
  const c = ctx
  const now = c.currentTime
  master.gain.cancelScheduledValues(now)
  master.gain.setValueAtTime(master.gain.value, now)
  master.gain.linearRampToValueAtTime(0, now + 0.9)
  window.setTimeout(() => {
    if (master && master.gain.value < 0.001) void c.suspend()
  }, 1000)
}
