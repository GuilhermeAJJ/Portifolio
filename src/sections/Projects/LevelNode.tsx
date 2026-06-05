import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { textColor, bgColor, borderColor, glow } from '../../lib/accent'

export function LevelNode({
  project,
  index,
  active,
  visited,
  onSelect,
  onHover,
}: {
  project: Project
  index: number
  active: boolean
  visited: boolean
  onSelect: () => void
  onHover: () => void
}) {
  const locked = project.status === 'soon'

  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${project.x}%`, top: `${project.y}%` }}
    >
      {/* marcador do jogador (acima do nó ativo) */}
      {active && (
        <motion.div
          className="absolute -top-9 left-1/2 -translate-x-1/2 text-2xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          🔻
        </motion.div>
      )}

      {/* nó da fase */}
      <motion.div
        animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={{ repeat: active ? Infinity : 0, duration: 1.2 }}
        className={`flex h-12 w-12 items-center justify-center border-4 sm:h-16 sm:w-16 ${
          active
            ? `${borderColor[project.accent]} ${glow[project.accent]}`
            : 'border-panel-border'
        } ${locked ? 'bg-screen' : visited ? bgColor[project.accent] : 'bg-panel'}`}
      >
        {locked ? (
          <span className="text-base text-dim sm:text-2xl">🔒</span>
        ) : (
          <span
            className={`text-base sm:text-2xl ${
              visited ? 'text-screen' : textColor[project.accent]
            }`}
          >
            {visited ? '✓' : index + 1}
          </span>
        )}
      </motion.div>

      {/* rótulo */}
      <div
        className={`mt-1 whitespace-nowrap text-center text-[7px] sm:text-[9px] ${
          locked ? 'text-dim' : active ? textColor[project.accent] : 'text-dim'
        }`}
      >
        {locked ? 'EM BREVE' : project.world}
      </div>
    </button>
  )
}
