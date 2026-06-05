import { LevelNode } from './LevelNode'
import { projects } from '../../data/projects'
import { useGameStore } from '../../store/gameStore'

/**
 * Mapa de fases: nós conectados por um caminho serpenteante (SVG).
 */
export function WorldMap({
  cursor,
  onCursor,
  onOpen,
}: {
  cursor: number
  onCursor: (i: number) => void
  onOpen: (i: number) => void
}) {
  const visited = useGameStore((s) => s.visited)

  // monta o caminho ligando os centros das fases
  const path = projects
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-md border-4 border-panel-border bg-[radial-gradient(circle_at_30%_20%,#1a1638,#0d0a1f)]">
      {/* estrelinhas de fundo */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute text-[8px] text-dim"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* caminho */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={path}
          fill="none"
          stroke="#3a2f6b"
          strokeWidth="1.2"
          strokeDasharray="3 2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* nós */}
      {projects.map((p, i) => (
        <LevelNode
          key={p.id}
          project={p}
          index={i}
          active={i === cursor}
          visited={visited.includes(p.id)}
          onSelect={() => onOpen(i)}
          onHover={() => onCursor(i)}
        />
      ))}
    </div>
  )
}

const STARS = [
  { x: 12, y: 18 }, { x: 28, y: 12 }, { x: 47, y: 22 }, { x: 70, y: 14 },
  { x: 88, y: 20 }, { x: 20, y: 50 }, { x: 55, y: 80 }, { x: 78, y: 72 },
  { x: 92, y: 60 }, { x: 8, y: 84 },
]
