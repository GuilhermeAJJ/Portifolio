import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GameState {
  /** ids de projetos (fases) já visitados */
  visited: string[]
  /** liga/desliga o som global */
  muted: boolean
  visit: (id: string) => void
  toggleMute: () => void
  reset: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      visited: [],
      muted: false,
      visit: (id) =>
        set((s) =>
          s.visited.includes(id) ? s : { visited: [...s.visited, id] }
        ),
      toggleMute: () => set((s) => ({ muted: !s.muted })),
      reset: () => set({ visited: [] }),
    }),
    { name: 'portfolio-save' }
  )
)
