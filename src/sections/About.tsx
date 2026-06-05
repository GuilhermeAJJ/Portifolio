import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { SectionShell } from '../components/ui/SectionShell'
import { useKeyboardNav } from '../hooks/useKeyboardNav'
import { useSound } from '../hooks/useSound'
import { aboutDialog, aboutFacts, contacts } from '../data/about'

export function About() {
  const [line, setLine] = useState(0)
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false) // linha atual terminou de digitar
  const play = useSound()
  const timer = useRef<number | null>(null)

  const full = aboutDialog[line] ?? ''
  const finished = line >= aboutDialog.length - 1 && done

  // efeito de máquina de escrever
  useEffect(() => {
    setShown('')
    setDone(false)
    let i = 0
    const tick = () => {
      i++
      setShown(full.slice(0, i))
      if (i % 2 === 0) play('blip')
      if (i >= full.length) {
        setDone(true)
        return
      }
      timer.current = window.setTimeout(tick, 35)
    }
    timer.current = window.setTimeout(tick, 200)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line])

  const advance = useCallback(() => {
    if (!done) {
      // pula a animação: mostra a linha inteira
      if (timer.current) clearTimeout(timer.current)
      setShown(full)
      setDone(true)
      return
    }
    if (line < aboutDialog.length - 1) {
      play('select')
      setLine((l) => l + 1)
    }
  }, [done, full, line, play])

  useKeyboardNav({ onConfirm: advance })

  return (
    <SectionShell
      title="SOBRE MIM"
      accent="cyan"
      footer={
        finished
          ? 'FIM DA CONVERSA — pressione ESC para voltar ao menu'
          : '▶ ENTER / CLIQUE para avançar o diálogo'
      }
    >
      <div className="flex h-full flex-col">
        {/* painel de fatos rápidos */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {aboutFacts.map((f) => (
            <div key={f.label} className="pixel-box p-2 text-center sm:p-3">
              <div className="text-[7px] text-dim sm:text-[9px]">{f.label}</div>
              <div className="text-cyan mt-1 text-[9px] sm:text-xs">{f.value}</div>
            </div>
          ))}
        </div>

        {/* área da "cutscene" */}
        <div className="flex flex-1 items-end justify-center">
          {/* sprite/avatar placeholder */}
          <motion.div
            key={line}
            initial={{ y: 6 }}
            animate={{ y: [6, -2, 6] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="mr-4 hidden h-24 w-24 shrink-0 items-center justify-center border-4 border-panel-border bg-panel text-4xl sm:flex"
            aria-hidden
          >
            🧑‍💻
          </motion.div>

          {/* caixa de diálogo */}
          <div
            onClick={advance}
            className="pixel-box min-h-[120px] w-full max-w-2xl cursor-pointer p-4 sm:p-6"
          >
            <div className="mb-2 text-[9px] text-yellow sm:text-xs">GUILHERME:</div>
            <p className="text-[11px] leading-relaxed text-ink sm:text-base">
              {shown}
              {!done && <span className="blink">▌</span>}
            </p>
            {done && (
              <div className="mt-3 text-right text-[8px] text-dim sm:text-[10px]">
                {line < aboutDialog.length - 1 ? '▼ ENTER' : '◇ FIM'}
              </div>
            )}
          </div>
        </div>

        {/* progresso do diálogo */}
        <div className="mt-5 flex justify-center gap-1">
          {aboutDialog.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 ${i <= line ? 'bg-cyan' : 'bg-panel-border'}`}
            />
          ))}
        </div>

        {/* contatos */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => play('blip')}
              onClick={() => play('coin')}
              className="flex items-center gap-2 text-[8px] text-dim transition-colors hover:text-cyan sm:text-[10px]"
            >
              <span className="text-yellow">▸ {c.label}</span>
              <span>{c.value}</span>
            </a>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
