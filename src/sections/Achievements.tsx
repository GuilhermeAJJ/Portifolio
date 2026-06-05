import { motion } from 'framer-motion'
import { SectionShell } from '../components/ui/SectionShell'
import { achievements, rarityColor } from '../data/achievements'
import { textColor, borderColor, bgColor, glow } from '../lib/accent'

export function Achievements() {
  const unlocked = achievements.filter((a) => a.progress === undefined).length
  const total = achievements.length

  return (
    <SectionShell
      title="CONQUISTAS"
      accent="yellow"
      footer={`SALA DE TROFÉUS — ${unlocked}/${total} desbloqueados + missões em andamento`}
    >
      {/* contador estilo gamerscore */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <span className="text-3xl">🏆</span>
        <div className="text-center">
          <div className="glow-yellow text-yellow text-lg sm:text-2xl">
            {unlocked}
            <span className="text-dim text-sm sm:text-base"> / {total}</span>
          </div>
          <div className="text-[8px] text-dim sm:text-[10px]">TROFÉUS OBTIDOS</div>
        </div>
      </div>

      <div className="mx-auto grid max-w-3xl gap-4">
        {achievements.map((a, i) => {
          const accent = rarityColor[a.rarity]
          const inProgress = a.progress !== undefined
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 120 }}
              className={`pixel-box flex gap-4 p-4 sm:p-5 ${
                inProgress ? 'opacity-95' : ''
              }`}
            >
              {/* medalha */}
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center border-4 text-3xl sm:h-20 sm:w-20 sm:text-4xl ${borderColor[accent]} ${
                  inProgress ? 'bg-screen grayscale-[40%]' : bgColor[accent]
                }`}
              >
                {a.icon}
              </div>

              {/* conteúdo */}
              <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[7px] sm:text-[9px] ${textColor[accent]} ${glow[accent]}`}>
                    ◆ {a.rarity}
                  </span>
                  {inProgress ? (
                    <span className="text-[7px] text-dim sm:text-[9px]">⌛ EM ANDAMENTO</span>
                  ) : (
                    <span className="text-[7px] text-green sm:text-[9px]">✓ DESBLOQUEADO</span>
                  )}
                </div>

                <h3 className="mt-1 text-[11px] leading-snug text-ink sm:text-sm">
                  {a.title}
                </h3>
                <div className="text-[9px] text-cyan sm:text-[11px]">{a.subtitle}</div>

                {a.detail && (
                  <p className="mt-1 text-[8px] leading-relaxed text-dim sm:text-[10px]">
                    {a.detail}
                  </p>
                )}

                {/* barra de progresso (missão em andamento) */}
                {inProgress && (
                  <div className="mt-2">
                    <div className="h-2.5 w-full border-2 border-panel-border bg-screen p-[1px]">
                      <motion.div
                        className={`h-full ${bgColor[accent]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${a.progress}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.9 }}
                      />
                    </div>
                  </div>
                )}

                {/* rodapé do card */}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[7px] text-dim sm:text-[9px]">
                  {a.date && <span>🗓 {a.date}</span>}
                  {a.credentialId && <span>🔑 ID: {a.credentialId}</span>}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionShell>
  )
}
