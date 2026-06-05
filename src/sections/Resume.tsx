import { motion } from 'framer-motion'
import { SectionShell } from '../components/ui/SectionShell'
import { StatBar } from '../components/ui/StatBar'
import { useSound } from '../hooks/useSound'
import {
  character,
  skills,
  inventory,
  experiences,
  resumeUrl,
} from '../data/resume'

export function Resume() {
  const play = useSound()
  return (
    <SectionShell
      title="CURRÍCULO"
      accent="green"
      footer="Tela de status do personagem — role para ver tudo"
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* coluna do personagem */}
        <div className="flex flex-col gap-4">
          <div className="pixel-box flex flex-col items-center p-5">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="mb-3 flex h-28 w-28 items-center justify-center border-4 border-panel-border bg-screen text-5xl"
            >
              🧙
            </motion.div>
            <div className="glow-green text-green text-sm">{character.name}</div>
            <div className="mt-1 text-[9px] text-dim sm:text-[10px]">
              {character.class} · LV {character.level}
            </div>
            <div className="mt-3 w-full space-y-2">
              <Gauge label="HP" value={character.hp} cls="bg-red" />
              <Gauge label="MP" value={character.mp} cls="bg-cyan" />
            </div>
          </div>

          {/* inventário */}
          <div className="pixel-box p-4">
            <div className="mb-3 text-[10px] text-yellow sm:text-xs">
              ▣ INVENTÁRIO
            </div>
            <div className="grid grid-cols-2 gap-2">
              {inventory.map((it) => (
                <div
                  key={it}
                  className="border-2 border-panel-border bg-screen px-2 py-1 text-center text-[8px] text-ink sm:text-[10px]"
                >
                  {it}
                </div>
              ))}
            </div>
          </div>

          <a
            href={resumeUrl}
            onMouseEnter={() => play('blip')}
            onClick={() => play('coin')}
            className="pixel-box block p-3 text-center text-[10px] text-yellow transition-transform hover:-translate-y-0.5 sm:text-xs"
          >
            ⬇ BAIXAR CURRÍCULO (PDF)
          </a>
        </div>

        {/* coluna de skills + experiências */}
        <div className="flex flex-col gap-6">
          <div className="pixel-box p-5">
            <div className="mb-4 text-[10px] text-yellow sm:text-xs">
              ⚔ SKILLS
            </div>
            <div className="space-y-3">
              {skills.map((s, i) => (
                <StatBar
                  key={s.name}
                  label={s.name}
                  value={s.level}
                  accent="green"
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>

          <div className="pixel-box p-5">
            <div className="mb-4 text-[10px] text-yellow sm:text-xs">
              ★ CONQUISTAS / EXPERIÊNCIA
            </div>
            <div className="space-y-4">
              {experiences.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="border-l-4 border-green pl-3"
                >
                  <div className="text-[10px] text-ink sm:text-sm">{e.title}</div>
                  <div className="text-[8px] text-cyan sm:text-[10px]">
                    {e.org} · {e.period}
                  </div>
                  <div className="mt-1 text-[8px] leading-relaxed text-dim sm:text-[10px]">
                    {e.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function Gauge({ label, value, cls }: { label: string; value: number; cls: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-6 text-[8px] text-dim sm:text-[10px]">{label}</span>
      <div className="h-2.5 flex-1 border-2 border-panel-border bg-screen p-[1px]">
        <motion.div
          className={`h-full ${cls}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  )
}
