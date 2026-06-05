import type { ReactNode } from 'react'
import { useGameStore } from '../store/gameStore'
import { useSound } from '../hooks/useSound'

/**
 * Moldura da TV CRT: envolve toda a aplicação com scanlines,
 * vinheta, flicker e um botão de mudo no canto.
 */
export function CRTScreen({ children }: { children: ReactNode }) {
  const muted = useGameStore((s) => s.muted)
  const toggleMute = useGameStore((s) => s.toggleMute)
  const play = useSound()

  return (
    <div className="flex h-full w-full items-center justify-center bg-void p-2 sm:p-6">
      {/* "tubo" da TV */}
      <div className="relative aspect-[4/3] max-h-full w-full max-w-6xl overflow-hidden rounded-[18px] border-8 border-[#1c1733] bg-screen shadow-[0_0_60px_rgba(0,0,0,0.8),inset_0_0_120px_rgba(0,0,0,0.6)]">
        {/* conteúdo */}
        <div className="crt-flicker absolute inset-0 overflow-hidden">
          {children}
        </div>

        {/* camadas de efeito */}
        <div className="crt-scanlines crt-vignette pointer-events-none absolute inset-0" />

        {/* botão de mudo */}
        <button
          onClick={() => {
            play('blip')
            toggleMute()
          }}
          className="absolute right-2 top-2 z-50 px-2 py-1 text-[8px] text-dim transition-colors hover:text-cyan sm:text-[10px]"
          aria-label="Alternar som"
        >
          {muted ? '🔇 SOM: OFF' : '🔊 SOM: ON'}
        </button>
      </div>
    </div>
  )
}
