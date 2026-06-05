import { useEffect } from 'react'

interface NavHandlers {
  onUp?: () => void
  onDown?: () => void
  onLeft?: () => void
  onRight?: () => void
  onConfirm?: () => void
  onBack?: () => void
}

/**
 * Liga setas/WASD + Enter/Espaço (confirmar) e Esc/Backspace (voltar)
 * aos handlers fornecidos.
 */
export function useKeyboardNav(handlers: NavHandlers, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          handlers.onUp?.()
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          handlers.onDown?.()
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          handlers.onLeft?.()
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          handlers.onRight?.()
          break
        case 'Enter':
        case ' ':
          handlers.onConfirm?.()
          break
        case 'Escape':
        case 'Backspace':
          handlers.onBack?.()
          break
        default:
          return
      }
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlers, enabled])
}
