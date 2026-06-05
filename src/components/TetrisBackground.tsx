import { useEffect, useRef } from 'react'

// Cores da paleta 16-bit (cyan, magenta, amarelo, verde, roxo)
const COLORS = ['#36e3ff', '#ff4fd8', '#ffd23f', '#5cff9d', '#8b5cf6']

// Tetrominós (I, O, T, L, J, S, Z) como matrizes
const SHAPES: number[][][] = [
  [[1, 1, 1, 1]], // I
  [
    [1, 1],
    [1, 1],
  ], // O
  [
    [0, 1, 0],
    [1, 1, 1],
  ], // T
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ], // L
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ], // J
  [
    [0, 1, 1],
    [1, 1, 0],
  ], // S
  [
    [1, 1, 0],
    [0, 1, 1],
  ], // Z
]

interface Piece {
  shape: number[][]
  color: string
  x: number // px
  y: number // px
  speed: number // px/s
  cell: number
}

/**
 * Fundo animado: peças de Tetris caindo devagar em opacidade baixa.
 * Respeita prefers-reduced-motion e pausa quando a aba não está visível.
 */
export function TetrisBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let pieces: Piece[] = []

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const makePiece = (atTop: boolean): Piece => {
      const cell = Math.max(10, Math.min(22, Math.round(width / 46)))
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      const shapeW = shape[0].length * cell
      const shapeH = shape.length * cell
      return {
        shape,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        x: rand(0, Math.max(0, width - shapeW)),
        y: atTop ? -shapeH - rand(0, height) : rand(0, height),
        speed: rand(14, 38),
        cell,
      }
    }

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(7, Math.round(width / 90))
      pieces = Array.from({ length: count }, () => makePiece(false))
    }

    const drawPiece = (p: Piece) => {
      ctx.fillStyle = p.color
      for (let r = 0; r < p.shape.length; r++) {
        for (let c = 0; c < p.shape[r].length; c++) {
          if (!p.shape[r][c]) continue
          const px = p.x + c * p.cell
          const py = p.y + r * p.cell
          // bloco com "miolo" pixelado
          ctx.fillRect(px + 1, py + 1, p.cell - 2, p.cell - 2)
          ctx.strokeStyle = 'rgba(0,0,0,0.35)'
          ctx.lineWidth = 1
          ctx.strokeRect(px + 1.5, py + 1.5, p.cell - 3, p.cell - 3)
        }
      }
    }

    const drawAll = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of pieces) drawPiece(p)
    }

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, width, height)
      for (const p of pieces) {
        p.y += p.speed * dt
        if (p.y > height + 4) Object.assign(p, makePiece(true))
        drawPiece(p)
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (!reduced) start()
    }

    const onResize = () => {
      setup()
      if (reduced) drawAll()
    }

    setup()
    if (reduced) {
      drawAll() // versão estática pra quem prefere menos movimento
    } else {
      start()
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-20"
    />
  )
}
