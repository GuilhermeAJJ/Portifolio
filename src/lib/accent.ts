// Mapas com nomes de classe COMPLETOS para o Tailwind detectar no scan.
// (classes montadas dinamicamente, ex. `text-${x}`, não são geradas.)

export type Accent = 'cyan' | 'magenta' | 'yellow' | 'green'

export const textColor: Record<Accent, string> = {
  cyan: 'text-cyan',
  magenta: 'text-magenta',
  yellow: 'text-yellow',
  green: 'text-green',
}

export const bgColor: Record<Accent, string> = {
  cyan: 'bg-cyan',
  magenta: 'bg-magenta',
  yellow: 'bg-yellow',
  green: 'bg-green',
}

export const borderColor: Record<Accent, string> = {
  cyan: 'border-cyan',
  magenta: 'border-magenta',
  yellow: 'border-yellow',
  green: 'border-green',
}

export const glow: Record<Accent, string> = {
  cyan: 'glow-cyan',
  magenta: 'glow-magenta',
  yellow: 'glow-yellow',
  green: 'glow-green',
}
