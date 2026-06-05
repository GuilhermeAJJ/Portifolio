export interface Project {
  id: string
  title: string
  /** Subtítulo curto estilo "World 1-1" */
  world: string
  description: string
  stack: string[]
  /** dificuldade 1-5, vira "estrelas" no detalhe */
  difficulty: number
  /** 'live' = publicado e jogável | 'soon' = fase bloqueada (em construção) */
  status: 'live' | 'soon'
  demoUrl?: string
  repoUrl?: string
  /** posição do nó no mapa (em %) */
  x: number
  y: number
  /** cor de destaque do nó */
  accent: 'cyan' | 'magenta' | 'yellow' | 'green'
}

// Fase desbloqueada = projeto publicado no GitHub.
// Fases 'soon' = próximos projetos (bloqueadas até serem construídas).
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Agente SQL para Agendamentos via WhatsApp',
    world: 'FASE 1-1',
    description:
      'Agente de IA que conversa pelo WhatsApp para criar e consultar agendamentos direto no banco SQL. Interpreta a mensagem do usuário em linguagem natural, traduz para operações no banco e responde de volta — automatizando o agendamento ponta a ponta.',
    stack: ['C#', 'SQL', 'LLM / Agente', 'WhatsApp API'],
    difficulty: 4,
    status: 'live',
    repoUrl: 'https://github.com/GuilhermeAJJ/AI-Agent-SQLserver',
    x: 16,
    y: 70,
    accent: 'green',
  },
  {
    id: 'p2',
    title: 'EM BREVE',
    world: 'FASE 1-2',
    description:
      'Próxima fase em construção. Em breve um novo projeto será desbloqueado aqui.',
    stack: [],
    difficulty: 0,
    status: 'soon',
    x: 40,
    y: 44,
    accent: 'cyan',
  },
  {
    id: 'p3',
    title: 'EM BREVE',
    world: 'FASE 1-3',
    description:
      'Próxima fase em construção. Em breve um novo projeto será desbloqueado aqui.',
    stack: [],
    difficulty: 0,
    status: 'soon',
    x: 64,
    y: 66,
    accent: 'yellow',
  },
  {
    id: 'p4',
    title: 'CHEFE: ???',
    world: 'FASE 1-4',
    description:
      'A fase do chefão ainda está trancada. Um projeto maior virá aqui no futuro.',
    stack: [],
    difficulty: 0,
    status: 'soon',
    x: 86,
    y: 36,
    accent: 'magenta',
  },
]
