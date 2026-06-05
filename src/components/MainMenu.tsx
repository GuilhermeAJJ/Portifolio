import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MenuOption } from './MenuOption'
import { useKeyboardNav } from '../hooks/useKeyboardNav'
import { useSound } from '../hooks/useSound'
import type { Accent } from '../lib/accent'

interface Item {
  label: string
  hint: string
  path: string
  accent: Accent
}

const ITEMS: Item[] = [
  { label: 'SOBRE MIM', hint: 'Quem é o dev por trás do código', path: '/sobre', accent: 'cyan' },
  { label: 'CURRÍCULO', hint: 'Stats, skills e experiência', path: '/curriculo', accent: 'green' },
  { label: 'PROJETOS', hint: 'Explore o mapa de fases', path: '/projetos', accent: 'magenta' },
  { label: 'CONQUISTAS', hint: 'Troféus, formação e certificações', path: '/conquistas', accent: 'yellow' },
]

export function MainMenu() {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const play = useSound()

  const move = useCallback(
    (dir: 1 | -1) => {
      play('blip')
      setIndex((i) => (i + dir + ITEMS.length) % ITEMS.length)
    },
    [play]
  )

  const confirm = useCallback(() => {
    play('select')
    navigate(ITEMS[index].path)
  }, [index, navigate, play])

  useKeyboardNav({
    onUp: () => move(-1),
    onDown: () => move(1),
    onConfirm: confirm,
  })

  return (
    <motion.div
      className="flex h-full w-full flex-col items-center justify-center bg-screen px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* título */}
      <div className="mb-5 text-center sm:mb-8">
        <motion.h1
          className="glow-magenta text-magenta text-xl leading-relaxed sm:text-4xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
        >
          GUILHERME JUSTINO
        </motion.h1>
        <p className="glow-cyan text-cyan mt-3 text-[8px] sm:mt-5 sm:text-xs">
          ▚ DEV BACK-END · INTEGRAÇÃO DE IA ▞
        </p>
        <p className="blink mt-3 text-[8px] text-yellow sm:text-[11px]">
          ● PRESS START ●
        </p>
      </div>

      {/* menu */}
      <nav className="pixel-box w-full max-w-md p-3 sm:p-5">
        {ITEMS.map((item, i) => (
          <MenuOption
            key={item.path}
            label={item.label}
            hint={item.hint}
            accent={item.accent}
            selected={i === index}
            onSelect={() => {
              setIndex(i)
              play('select')
              navigate(item.path)
            }}
            onHover={() => {
              if (i !== index) {
                play('blip')
                setIndex(i)
              }
            }}
          />
        ))}
      </nav>

      {/* dica de controles */}
      <p className="mt-6 text-center text-[8px] text-dim sm:mt-8 sm:text-[10px]">
        ↑ ↓ MOVER &nbsp;·&nbsp; ENTER CONFIRMAR &nbsp;·&nbsp; CLIQUE TAMBÉM FUNCIONA
      </p>
    </motion.div>
  )
}
