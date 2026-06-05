import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'
import { useSound } from '../../hooks/useSound'
import { textColor, glow, type Accent } from '../../lib/accent'

/**
 * Layout padrão de uma seção: título no topo, conteúdo rolável,
 * rodapé com dica de "voltar" (Esc / botão).
 */
export function SectionShell({
  title,
  accent = 'cyan',
  children,
  footer,
  onBack,
}: {
  title: string
  accent?: Accent
  children: ReactNode
  footer?: ReactNode
  /** sobrescreve o comportamento de voltar (padrão: ir ao menu) */
  onBack?: () => void
}) {
  const navigate = useNavigate()
  const play = useSound()

  const goBack = () => {
    play('back')
    if (onBack) onBack()
    else navigate('/')
  }

  useKeyboardNav({ onBack: goBack })

  return (
    <motion.div
      className="flex h-full w-full flex-col bg-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b-4 border-panel-border px-4 py-3 sm:px-8 sm:py-4">
        <h1 className={`${glow[accent]} ${textColor[accent]} text-sm sm:text-xl`}>
          {title}
        </h1>
        <button
          onClick={goBack}
          className="text-[8px] text-dim transition-colors hover:text-ink sm:text-[10px]"
        >
          ◀ VOLTAR [ESC]
        </button>
      </div>

      {/* conteúdo */}
      <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-10 sm:py-8">
        {children}
      </div>

      {/* footer */}
      {footer && (
        <div className="border-t-4 border-panel-border px-4 py-2 text-[8px] text-dim sm:px-8 sm:text-[10px]">
          {footer}
        </div>
      )}
    </motion.div>
  )
}
