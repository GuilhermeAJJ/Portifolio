export type Rarity = 'LENDÁRIO' | 'ÉPICO' | 'RARO' | 'COMUM'

export interface Achievement {
  id: string
  icon: string
  title: string
  subtitle: string
  detail?: string
  rarity: Rarity
  /** se em andamento, mostra barra de progresso (0-100) em vez de "desbloqueado" */
  progress?: number
  date?: string
  credentialId?: string
}

// Formação, certificações e cursos — modelados como troféus.
export const achievements: Achievement[] = [
  {
    id: 'a1',
    icon: '🎓',
    title: 'Análise e Desenvolvimento de Sistemas',
    subtitle: 'Universidade Cruzeiro do Sul',
    detail: 'Graduação em andamento — a missão principal da jornada acadêmica.',
    rarity: 'LENDÁRIO',
    progress: 75,
    date: 'Previsão: 12/2026',
  },
  {
    id: 'a2',
    icon: '🏅',
    title: 'Microsoft Certified: Azure AI Fundamentals',
    subtitle: 'Conceitos básicos da IA do Azure — Microsoft',
    detail: 'Certificação oficial validando os fundamentos de IA na nuvem Azure.',
    rarity: 'ÉPICO',
    date: 'Obtido em 21/03/2026',
    credentialId: '51F2527C6E88967B',
  },
  {
    id: 'a3',
    icon: '📜',
    title: 'Lógica de Programação e Desenvolvimento Web',
    subtitle: 'Udemy — Curso Completo',
    detail: 'Base sólida em lógica e fundamentos do desenvolvimento web.',
    rarity: 'RARO',
    date: 'Concluído',
  },
]

export const rarityColor: Record<Rarity, 'cyan' | 'magenta' | 'yellow' | 'green'> = {
  LENDÁRIO: 'yellow',
  ÉPICO: 'magenta',
  RARO: 'cyan',
  COMUM: 'green',
}
