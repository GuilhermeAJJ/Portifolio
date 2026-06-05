import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SectionShell } from '../../components/ui/SectionShell'
import { WorldMap } from './WorldMap'
import { LevelDetail } from './LevelDetail'
import { projects } from '../../data/projects'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'
import { useSound } from '../../hooks/useSound'
import { useGameStore } from '../../store/gameStore'

export function Projects() {
  const [cursor, setCursor] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navigate = useNavigate()
  const play = useSound()
  const visit = useGameStore((s) => s.visit)
  const visited = useGameStore((s) => s.visited)

  const isOpen = openIndex !== null

  const move = useCallback(
    (dir: 1 | -1) => {
      play('blip')
      setCursor((c) => (c + dir + projects.length) % projects.length)
    },
    [play]
  )

  const open = useCallback(
    (i: number) => {
      const p = projects[i]
      play(p.status === 'soon' ? 'error' : 'select')
      setCursor(i)
      setOpenIndex(i)
      if (p.status === 'live') visit(p.id)
    },
    [play, visit]
  )

  // navegação no mapa (desativada quando o detalhe está aberto)
  useKeyboardNav(
    {
      onLeft: () => move(-1),
      onUp: () => move(-1),
      onRight: () => move(1),
      onDown: () => move(1),
      onConfirm: () => open(cursor),
    },
    !isOpen
  )

  const handleBack = () => {
    if (isOpen) setOpenIndex(null)
    else navigate('/')
  }

  const liveProjects = projects.filter((p) => p.status === 'live')
  const liveVisited = liveProjects.filter((p) => visited.includes(p.id)).length
  const pct = Math.round((liveVisited / liveProjects.length) * 100)

  return (
    <SectionShell
      title="PROJETOS"
      accent="magenta"
      onBack={handleBack}
      footer={
        isOpen
          ? 'ESC volta ao mapa'
          : `← → MOVER · ENTER ENTRAR NA FASE · DESBLOQUEADAS: ${pct}% (${liveVisited}/${liveProjects.length})`
      }
    >
      <div className="relative h-full">
        <WorldMap cursor={cursor} onCursor={setCursor} onOpen={open} />

        <AnimatePresence>
          {isOpen && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-screen/85 p-3">
              <LevelDetail
                project={projects[openIndex]}
                onClose={() => {
                  play('back')
                  setOpenIndex(null)
                }}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}
