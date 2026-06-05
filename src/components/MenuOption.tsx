import { motion } from 'framer-motion'
import { textColor, glow, type Accent } from '../lib/accent'

export function MenuOption({
  label,
  hint,
  accent,
  selected,
  onSelect,
  onHover,
}: {
  label: string
  hint: string
  accent: Accent
  selected: boolean
  onSelect: () => void
  onHover: () => void
}) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      className="group flex w-full items-center gap-3 px-3 py-3 text-left sm:gap-4 sm:px-4"
    >
      {/* cursor */}
      <span
        className={`w-5 text-base sm:w-7 sm:text-xl ${
          selected ? `${textColor[accent]} ${glow[accent]}` : 'text-transparent'
        }`}
      >
        ▶
      </span>

      <div className="flex flex-col gap-1">
        <motion.span
          animate={{ x: selected ? 4 : 0 }}
          className={`text-sm sm:text-2xl ${
            selected
              ? `${textColor[accent]} ${glow[accent]}`
              : 'text-ink/70 group-hover:text-ink'
          }`}
        >
          {label}
        </motion.span>
        <span
          className={`text-[8px] sm:text-[10px] ${
            selected ? 'text-dim' : 'text-transparent'
          }`}
        >
          {hint}
        </span>
      </div>
    </button>
  )
}
