export interface Skill {
  name: string
  /** nível 0-100 */
  level: number
}

export interface Experience {
  title: string
  org: string
  period: string
  detail: string
}

export const character = {
  name: 'GUILHERME',
  class: 'DEV BACK-END · IA',
  title: 'Integrador de IA em Sistemas',
  level: 4,
  hp: 90,
  mp: 88,
}

export const skills: Skill[] = [
  { name: 'Integração de IA / LLMs', level: 82 },
  { name: 'C# / .NET', level: 72 },
  { name: 'Semantic Kernel / Azure AI', level: 74 },
  { name: 'n8n / Power Automate', level: 80 },
  { name: 'SQL Server / Oracle', level: 66 },
  { name: 'Minimal APIs / Webhooks / API Rest', level: 70 },
  { name: 'Azure', level: 70 },
]

export const inventory: string[] = [
  'C# / .NET',
  'Azure AI Foundry',
  'Semantic Kernel',
  'Azure',
  'n8n',
  'Power Automate',
  'SQL Server',
  'Oracle',
  'Active Directory',
  'Git',
]

export const experiences: Experience[] = [
  {
    title: 'Assistente de Desenvolvimento',
    org: 'Unimar Agenciamentos Marítimos',
    period: '04/2026 — Atual',
    detail:
      'Integro LLMs direto no código C# com Semantic Kernel (e-mails automáticos baseados no banco), crio agentes autônomos com Azure AI Foundry, construo pipelines de extração de PDFs com Document Intelligence (JSON → SQL Server) e um sistema de monitoramento em tempo real com robôs C# + Oracle alimentando uma Minimal API.',
  },
  {
    title: 'Auxiliar de Suporte',
    org: 'Unimar Agenciamentos Marítimos',
    period: '04/2024 — 03/2026',
    detail:
      'Pipelines C# + n8n para extração inteligente de PDFs (Base64 + IA), automação de alertas críticos via WhatsApp, fluxos de RPA com Power Automate, dashboards no Power BI e suporte N1/N2 (Active Directory, Microsoft 365, VPN FortiClient).',
  },
  {
    title: 'Estagiário de TI',
    org: 'Unimar Agenciamentos Marítimos',
    period: '04/2024 — 04/2025',
    detail:
      'Manutenção de hardware/software, migração para o Microsoft 365 (e-mail, OneDrive, SharePoint) e atendimento de chamados técnicos N1.',
  },
  {
    title: 'Aprendiz Auxiliar Administrativo',
    org: 'CET Santos',
    period: '06/2022 — 08/2023',
    detail:
      'Atendimento ao cliente, consultas de radares e gestão de multas no portal da CET, organização de processos e manutenção preventiva de microcomputadores.',
  },
]

export const resumeUrl = '/curriculo.pdf'
