import { motion } from 'framer-motion'

const ACCENTS: Record<string, string> = {
  cyan: 'bg-cyan',
  magenta: 'bg-magenta',
  yellow: 'bg-yellow',
  green: 'bg-green',
}

/** Barra de XP/skill em blocos, estilo RPG. */
export function StatBar({
  label,
  value,
  accent = 'cyan',
  delay = 0,
}: {
  label: string
  value: number
  accent?: keyof typeof ACCENTS
  delay?: number
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[9px] sm:text-[11px]">
        <span className="text-ink">{label}</span>
        <span className="text-dim">{value}/100</span>
      </div>
      <div className="h-3 w-full border-2 border-panel-border bg-screen p-[2px]">
        <motion.div
          className={`h-full ${ACCENTS[accent]}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
