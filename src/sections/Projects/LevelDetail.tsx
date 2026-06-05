import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { textColor, glow } from '../../lib/accent'
import { useSound } from '../../hooks/useSound'

export function LevelDetail({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const play = useSound()
  const locked = project.status === 'soon'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2 }}
      className="flex h-full w-full items-center justify-center"
    >
      <div className="pixel-box max-h-full w-full max-w-2xl overflow-y-auto p-5 sm:p-7">
        <div className="mb-1 text-[8px] text-dim sm:text-[10px]">
          {project.world}
        </div>
        <h2 className={`${textColor[project.accent]} ${glow[project.accent]} text-base sm:text-2xl`}>
          {project.title}
        </h2>

        {/* dificuldade (só fases publicadas) */}
        {!locked && (
          <div className="mt-3 flex items-center gap-2 text-[9px] text-dim sm:text-xs">
            <span>DIFICULDADE:</span>
            <span className="text-yellow">
              {'★'.repeat(project.difficulty)}
              {'☆'.repeat(5 - project.difficulty)}
            </span>
          </div>
        )}

        {/* "screenshot" placeholder */}
        <div className="mt-4 flex h-32 items-center justify-center border-4 border-panel-border bg-screen text-4xl sm:h-44">
          {locked ? '🔒' : '🖼️'}
        </div>

        <p className="mt-4 text-[10px] leading-relaxed text-ink sm:text-sm">
          {locked ? '🚧 FASE EM CONSTRUÇÃO — ' : ''}
          {project.description}
        </p>

        {/* stack */}
        {project.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="border-2 border-panel-border bg-screen px-2 py-1 text-[8px] text-cyan sm:text-[10px]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ações */}
        <div className="mt-6 flex flex-wrap gap-3">
          {locked && (
            <span className="border-2 border-panel-border px-3 py-2 text-[9px] text-dim sm:text-xs">
              ⏳ EM BREVE
            </span>
          )}
          {!locked && project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => play('blip')}
              onClick={() => play('coin')}
              className="border-2 border-green px-3 py-2 text-[9px] text-green transition-transform hover:-translate-y-0.5 sm:text-xs"
            >
              ▶ JOGAR (DEMO)
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => play('blip')}
              onClick={() => play('coin')}
              className="border-2 border-cyan px-3 py-2 text-[9px] text-cyan transition-transform hover:-translate-y-0.5 sm:text-xs"
            >
              ⌥ CÓDIGO (REPO)
            </a>
          )}
          <button
            onClick={onClose}
            className="border-2 border-panel-border px-3 py-2 text-[9px] text-dim transition-colors hover:text-ink sm:text-xs"
          >
            ◀ VOLTAR AO MAPA [ESC]
          </button>
        </div>
      </div>
    </motion.div>
  )
}
