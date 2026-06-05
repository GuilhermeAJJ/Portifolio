import { useCallback, useRef } from 'react'
import { useGameStore } from '../store/gameStore'

type Tone = 'blip' | 'select' | 'back' | 'error' | 'coin'

const TONES: Record<Tone, { freq: number; type: OscillatorType; dur: number; sweep?: number }> = {
  blip: { freq: 440, type: 'square', dur: 0.05 },
  select: { freq: 660, type: 'square', dur: 0.1, sweep: 990 },
  back: { freq: 330, type: 'square', dur: 0.08, sweep: 180 },
  error: { freq: 140, type: 'sawtooth', dur: 0.18 },
  coin: { freq: 988, type: 'square', dur: 0.08, sweep: 1319 },
}

/**
 * Sons retrô gerados via Web Audio API — sem precisar de arquivos de áudio.
 */
export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null)
  const muted = useGameStore((s) => s.muted)

  const play = useCallback(
    (tone: Tone) => {
      if (muted) return
      try {
        if (!ctxRef.current) {
          ctxRef.current = new (window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext)()
        }
        const ctx = ctxRef.current
        if (ctx.state === 'suspended') ctx.resume()

        const t = TONES[tone]
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = t.type
        osc.frequency.setValueAtTime(t.freq, ctx.currentTime)
        if (t.sweep) {
          osc.frequency.exponentialRampToValueAtTime(
            t.sweep,
            ctx.currentTime + t.dur
          )
        }
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t.dur)
        osc.connect(gain).connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + t.dur)
      } catch {
        /* áudio indisponível — ignora silenciosamente */
      }
    },
    [muted]
  )

  return play
}
